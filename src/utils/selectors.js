

export const selectLoginStatus = (state) => state.login.status

export const selectToken = (state) => state.login.token

export const selectError = (state) => state.login.error



export const selectUser = (state) => state.userProfile

export const selectUserStatus = (state) => state.userProfile.status

export const selectUserFirstName = (state) => state.userProfile.data.firstName

export const selectUserLastName = (state) => state.userProfile.data.lastName