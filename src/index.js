import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './routing/PrivateRoute';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Home } from './pages/home';
import { SignIn } from './pages/signIn';
import { Profile } from './pages/profile';
import { Error } from './pages/error';
import { store } from './redux/store/configureStore'
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/sign-in' element={<SignIn />} />
          <Route path='/profile' element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path='/*' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
