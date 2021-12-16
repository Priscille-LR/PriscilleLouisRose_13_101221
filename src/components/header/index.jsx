import logo from '../../assets/argentBankLogo.png';
import { Link } from 'react-router-dom';
import './header.css';

export function Header() {
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

         <div>
            <Link to="/sign-in" className="main-nav-item  main-nav-link ">
               <i className="fa fa-user-circle sign-in-icon-home"></i>
               <span>Sign In</span>
            </Link>
         </div>
      </nav>
   );
}
