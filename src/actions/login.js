const LOGIN_USER = "LOGIN_USER"

export const logInUser = (isUserLoggedIn, token = undefined) => ({
    type: LOGIN_USER,
    payload: {
        isUserLoggedIn,
        token
    }
})