import { createStore } from 'redux';
// import loginReducer from '../reducers/reducer';
//import produce from 'immer'

const LOGIN_USER = "LOGIN_USER"


const initialState = {
    isUserLoggedIn: false,
    token: ""
}

export const loginReducer = (state = initialState, action) => {
    if (action.type === LOGIN_USER) {
        return {
            ...state,
            isUserLoggedIn: action.payload.isUserLoggedIn,
            token: action.payload.token
        }
    }

    return state
}


export const store = createStore(loginReducer, initialState)
console.log(store.getState())

store.subscribe(() => {
    console.log(store.getState());
});
