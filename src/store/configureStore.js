import { combineReducers, createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/login'
import userProfileReducer from '../features/userProfile'
//import produce from 'immer'

const LOGIN_USER = "LOGIN_USER"
const GET_USER_INFO = "GET_USER_INFO"


const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const initialStateUserLogIn = {
    isUserLoggedIn: false,
    token: ""
}

const initialStateUserProfile = {
    email: "",
    firstname: "",
    lastname: "",
    createdAt: "",
    UpdatedAt: "",
    id: "",
}


// export const loginReducer = (state = initialStateUserLogIn, action) => {
//     if (action.type === LOGIN_USER) {
//         return {
//             ...state,
//             isUserLoggedIn: action.payload.isUserLoggedIn,
//             token: action.payload.token
//         }
//     }

//     return state
// }

// export const profileReducer = (state = initialStateUserProfile, action) => {
//     if (action.type === GET_USER_INFO) {
//         return {
//             ...state,
//             email: action.payload.email,
//             firstname: action.payload.firstname,
//             lastname: action.payload.lastname,
//             createdAt: action.payload.createdAt,
//             UpdatedAt: action.payload.UpdatedAt,
//             id: action.payload.id
//         }
//     }
//     return state
// }

// export const rootReducer = combineReducers({
//     login: loginReducer,
//     userInfo: profileReducer
// })

// export const store = createStore(rootReducer, reduxDevtools)

export const store = configureStore({
    reducer: {
        login: loginReducer,
        userProfile: userProfileReducer
    }
})

//export const store = createStore(loginReducer, initialStateUserLogIn)
console.log(store.getState())

store.subscribe(() => {
    console.log(store.getState());
});
