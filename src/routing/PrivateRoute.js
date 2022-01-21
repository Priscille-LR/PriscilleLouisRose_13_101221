import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsUserLoggedIn } from '../redux/utils/selectors'
import { logout } from '../redux/features/login'


export function PrivateRoute({ children }) {

    const dispatch = useDispatch()

    const isUserLoggedIn = useSelector(selectIsUserLoggedIn)

    if (!isUserLoggedIn) {
        dispatch(logout())
        return <Navigate to='/sign-in' />
    } else {
        return children
    }

    //return isUserLoggedIn ? children : <Navigate to='/sign-in' />
}
