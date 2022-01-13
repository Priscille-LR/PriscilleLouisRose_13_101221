// import { Form } from '../../components/form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchOrUpdateToken } from '../../features/login';
import { selectToken } from '../../utils/selectors';
import './signIn.css';

export function SignIn() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [invalidData, setInvalidData] = useState('');

   const dispatch = useDispatch();
   const isUserLoggedIn = useSelector(selectToken) != null;

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (username === '' || password === '') {
         setInvalidData('Veuillez remplir correctement les champs.');
      } else {
         dispatch(fetchOrUpdateToken(username, password));
      }
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
                  <input type="checkbox" id="remember-me" />
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
