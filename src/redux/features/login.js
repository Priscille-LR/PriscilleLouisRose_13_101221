import { createSlice } from '@reduxjs/toolkit'
import { selectLoginStatus } from '../utils/selectors'
import UserService from '../../service/UserService'

const initialState = {
    status: 'void',
    token: null,
    error: null
}

const api = new UserService()

export function fetchOrUpdateToken(stayLogged, username, password) { //thunk creator => function qui retourne thunk
    return async (dispatch, getState) => { //thunk
        const status = selectLoginStatus(getState())

        if (status === 'pending' || status === 'updating') {
            return
        }

        dispatch(actions.fetching())

        try {
            const response = await api.loginUser(username, password)
            if (response.status === 200) {
                dispatch(actions.resolved(response.body.token))
                if (stayLogged) { //persistent login => store token in local storage if user has clicked on "remember me"
                    window.localStorage.setItem('access_token', response.body.token)
                }
            } else if (response.status === 400) {
                dispatch(actions.rejected(response.message))
            }
        } catch (error) {
            console.log("error")
            dispatch(actions.rejected('unable to get user token'))
        }
    }
}

//create slice => generate actions and reducer in one go
//uses Immer => state = draft => possible to update it
//=> easier to read/maintain
const { actions, reducer } = createSlice({
    name: 'login',
    initialState,
    reducers: {
        fetching: {
            prepare: (username, password) => ({ //arg => payload
                payload: { username, password }
            }),
            reducer: (draft) => {
                if (draft.status === 'void') {
                    draft.status = 'pending'
                    return
                }
                if (draft.status === 'rejected') {
                    draft.error = null
                    draft.status = 'pending'
                    return
                }
                if (draft.status === 'resolved') {
                    draft.status = 'updating'
                    return
                }
            },
        },
        resolved: {
            prepare: (token) => ({
                payload: token
            }),
            reducer: (draft, action) => {
                if (draft.status === 'pending' || draft.status === 'updating') {
                    draft.token = action.payload
                    draft.status = 'resolved'
                    return
                }
            }
        },
        rejected: {
            prepare: (error) => ({
                payload: error
            }),
            reducer: (draft, action) => {
                if (draft.status === 'pending' || draft.status === 'updating') {
                    draft.error = action.payload
                    draft.token = null
                    draft.status = 'rejected'
                    return
                }
            }
        },
        logout: () => {
            localStorage.clear();
            return initialState
        },
    }
})

export const { logout } = actions
export default reducer

