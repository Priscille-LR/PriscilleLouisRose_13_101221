import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsUserLoggedIn } from '../redux/utils/selectors'

export function PrivateRoute({ children }) {

    const isUserLoggedIn = useSelector(selectIsUserLoggedIn)

    return isUserLoggedIn ? children : <Navigate to='/sign-in' />
}
