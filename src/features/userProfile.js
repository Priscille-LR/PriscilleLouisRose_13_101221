import { createSlice } from '@reduxjs/toolkit'
import { selectUserStatus, selectToken } from '../utils/selectors'
import DataFromAPI from '../service/DataFromAPI'

const initialState = {
    status: 'void',
    data: {},
    error: null
}


export async function fetchOrUpdateUserProfile(dispatch, getState) {
    const api = new DataFromAPI()
    const status = selectUserStatus(getState())
    const token = selectToken(getState())

    if (status === 'pending' || status === 'updating') {
        return
    }

    dispatch(actions.fetching())

    try {
        const response = await api.getUserProfile(token)
        if (response.status === 200) {
            dispatch(actions.resolved(response.body))
        } else if (response.status === 400) {
            dispatch(actions.rejected(response.message))
        }
    } catch (error) {
        console.log("error")
        dispatch(actions.rejected('unable to get user profile'))
    }

}

const { actions, reducer } = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        fetching: (draft) => {
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
            return
        },
        resolved: (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.data = action.payload
                draft.status = 'resolved'
                return
            }
            return
        },
        rejected: (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.error = action.payload
                draft.data = null
                draft.status = 'rejected'
                return
            }
            return
        }
    }

})

export default reducer
