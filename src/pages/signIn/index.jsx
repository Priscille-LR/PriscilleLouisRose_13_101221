// import { Form } from '../../components/form';
import './signIn.css';
import DataFromAPI from '../../service/DataFromAPI';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logInUser } from '../../actions/login';
import { Navigate } from 'react-router-dom';

export function SignIn() {
   const api = new DataFromAPI();
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [invalidData, setInvalidData] = useState('');

   // api.profile();

   const dispatch = useDispatch();
   const isUserLoggedIn = useSelector((state) => state.isUserLoggedIn);
   //const token = useSelector((state) => state.token);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const token = await api.login(username, password);
      // const currentDate = Date.now() / 1000;
      // console.log(currentDate);
      // console.log(token);

      //check if token is still valid
      const isTokenExpired = (token) =>
         Date.now() >= JSON.parse(atob(token.split('.')[1])).exp * 1000;

      if (token && !isTokenExpired(token)) {
         dispatch(logInUser(true, token));
      } else if (username === '' || password === '') {
         setInvalidData('Veuillez remplir correctement les champs.');
      } else if (isTokenExpired) {
         setInvalidData(
            'Votre session est expirée. Veuillez vous reconnecter.'
         );
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
