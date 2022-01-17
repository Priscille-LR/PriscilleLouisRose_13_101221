import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/login'
import userProfileReducer from '../features/userProfile'


export const store = configureStore({
    reducer: {
        login: loginReducer,
        userProfile: userProfileReducer,
    }
})

console.log(store.getState())

store.subscribe(() => {
    console.log(store.getState());
});



