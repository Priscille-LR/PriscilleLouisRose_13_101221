// import { createStore } from 'redux';

// const LOGIN_USER = "LOGIN_USER"


// const initialState = {
//     isuserLoggedIn: false,
//     token: undefined
// }

// const loginReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case LOGIN_USER:
//             return [
//                 ...state,
//                 action.payload.isuserLoggedIn,
//                 action.payload.token
//             ]
//         default:
//             return state
//     }
// }

// const store = createStore(loginReducer, initialState)
// console.log(store.getState())

// // store.subscribe(() => {
// //     console.log(store.getState())
// // })

// export default loginReducer