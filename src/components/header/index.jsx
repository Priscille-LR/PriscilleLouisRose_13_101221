import logo from '../../assets/argentBankLogo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
   selectToken,
   selectUserFirstName,
   selectUserLastName,
} from '../../utils/selectors';
import { logout } from '../../features/login';
import './header.css';

export function Header() {
   const dispatch = useDispatch();
   const isUserLoggedIn = useSelector(selectToken) != null;
   const firstName = useSelector(selectUserFirstName);
   const lastName = useSelector(selectUserLastName);

   const handleLogOut = () => {
      dispatch(logout());
   };

   let loginLink;

   if (!isUserLoggedIn) {
      loginLink = (
         <Link to="/sign-in" className="main-nav-item  main-nav-link ">
            <i className="fa fa-user-circle sign-in-icon-home"></i>
            <span>Sign In</span>
         </Link>
      );
   } else {
      loginLink = (
         <Link
            to="/"
            className="main-nav-item  main-nav-link "
            onClick={handleLogOut}
         >
            <div className="user-logout">
               <div>
                  <i className="fa fa-user-circle sign-in-icon-home"></i>
                  <span>
                     {firstName} {lastName}
                  </span>
               </div>
               <div className="signout">
                  <i className="fas fa-sign-out-alt sign-in-icon-home"></i>
                  <span>Sign out</span>
               </div>
            </div>
         </Link>
      );
   }

   return (
      <nav className="main-nav">
         <Link to="/" className="main-nav-logo  main-nav-link ">
            <img
               className="main-nav-logo-image"
               src={logo}
               alt="Argent Bank Logo"
            />
         </Link>
         <h1 className="sr-only">Argent Bank</h1>
         {loginLink}
      </nav>
   );
}
