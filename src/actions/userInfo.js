const GET_USER_INFO = "GET_USER_INFO"

export const getUserInfo = (
    email,
    firstname,
    lastname,
    createdATt,
    UpdatedAt,
    id) => ({
        type: GET_USER_INFO,
        payload: {
            email,
            firstname,
            lastname,
            createdATt,
            UpdatedAt,
            id
        }
    })