

export const selectLoginStatus = (state) => state.login.status

export const selectToken = (state) => state.login.token || localStorage.getItem('access_token');

//check if token is still valid
export const selectIsTokenExpired = (state) => Date.now() >= JSON.parse(atob(selectToken(state).split('.')[1])).exp * 1000;

export const selectIsUserLoggedIn = (state) => selectToken(state) && !selectIsTokenExpired(state);

export const selectError = (state) => state.login.error



export const selectUser = (state) => state.userProfile

export const selectUserStatus = (state) => state.userProfile.status

export const selectUserInfo = (state) => state.userProfile.data

export const selectUserFirstName = (state) => state.userProfile.data.firstName

export const selectUserLastName = (state) => state.userProfile.data.lastName


