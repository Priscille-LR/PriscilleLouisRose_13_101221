import { createSlice } from '@reduxjs/toolkit'
import { selectUserStatus, selectToken } from '../utils/selectors'
import UserService from '../../service/UserService'

const initialState = {
    status: 'void',
    data: {},
    error: null
}


const api = new UserService()

//if user has clicked on "edit name", dispatch editing-related actions;
//otherwise, get user profile info
export function fetchOrUpdateUserProfile(isEditName, firstName, lastName) {
    return async (dispatch, getState) => {
        const status = selectUserStatus(getState())
        const token = selectToken(getState())

        if (status === 'pending' || status === 'updating') {
            return
        }

        if (isEditName) {
            dispatch(actions.editNameFetching())

            try {
                const response = await api.edituserName(token, firstName, lastName)
                if (response.status === 200) {
                    dispatch(actions.editNameResolved(response.body))
                } else if (response.status === 400) {
                    dispatch(actions.editNameRejected(response.message))
                }

            } catch (error) {
                console.log("error")
                dispatch(actions.editNameRejected('unable to edit user name'))
            }


        } else {
            dispatch(actions.getProfileFetching())

            try {
                const response = await api.getUserProfile(token)
                if (response.status === 200) {
                    dispatch(actions.getProfileResolved(response.body))
                } else if (response.status === 400) {
                    dispatch(actions.getProfileRejected(response.message))
                }
            } catch (error) {
                console.log("error")
                dispatch(actions.getProfileRejected('unable to get user profile'))
            }

        }
    }
}


const { actions, reducer } = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        getProfileFetching: (draft) => {
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
        getProfileResolved: (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.data = action.payload
                draft.status = 'resolved'
                return
            }
        },
        getProfileRejected: (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.error = action.payload
                draft.data = null
                draft.status = 'rejected'
                return
            }
        },
        editNameFetching: (draft) => {
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
        editNameResolved: (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.data = action.payload
                draft.status = 'resolved'
                return
            }
        },
        editNameRejected: (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.error = action.payload
                draft.data = null
                draft.status = 'rejected'
                return
            }

        },
        resetUserData: () => {
            return initialState
        },
    }
})

export const { resetUserData } = actions

export default reducer
