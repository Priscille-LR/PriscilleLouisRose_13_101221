import { Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
//import { Profile } from './pages/profile'
import { selectToken } from './utils/selectors'

export function PrivateRoute({ children }) {

    const token = useSelector(selectToken)


    //check if token is still valid
    // const currentDate = Date.now() / 1000;
    const isTokenExpired = (token) =>
        Date.now() >= JSON.parse(atob(token.split('.')[1])).exp * 1000;

    const isUserLoggedIn = token && !isTokenExpired(token)

    return isUserLoggedIn ? children : <Navigate to='/sign-in' />

}
