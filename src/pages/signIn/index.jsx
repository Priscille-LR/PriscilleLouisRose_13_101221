// import { Form } from '../../components/form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchOrUpdateToken } from '../../redux/features/login';
import { selectIsUserLoggedIn } from '../../redux/utils/selectors';
import './signIn.css';

export function SignIn() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [invalidData, setInvalidData] = useState('');
   const [stayLogged, setStayLogged] = useState(false);

   const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

   const dispatch = useDispatch();

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (username === '' || password === '') {
         setInvalidData('Veuillez remplir correctement les champs.');
      } else {
         dispatch(fetchOrUpdateToken(stayLogged, username, password));
      }
   };

   //if user clicks on "remember me"
   const handleStayLogged = (e) => {
      const checked = e.target.checked;
      setStayLogged(checked);
   };

   const signInForm = (
      <main className="main bg-dark">
         <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
               <div className="input-wrapper">
                  <label htmlFor="username">Username</label>
                  <input
                     type="text"
                     id="username"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                  />
               </div>
               <div className="input-wrapper">
                  <label htmlFor="password">Password</label>
                  <input
                     type="password"
                     id="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
               <div className="input-remember">
                  <input
                     type="checkbox"
                     id="remember-me"
                     onChange={handleStayLogged}
                  />
                  <label htmlFor="remember-me">Remember me</label>
               </div>

               <div className="invalid-data">{invalidData}</div>

               <button className="sign-in-button">Sign In</button>
            </form>
         </section>
      </main>
   );

   return isUserLoggedIn ? <Navigate to="/profile" /> : signInForm;
}
