import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchOrUpdateUserProfile } from '../../features/userProfile';
import { selectUserFirstName, selectUserLastName } from '../../utils/selectors';
import './greeting.css';

export function Greeting() {
   const dispatch = useDispatch();
   const firstName = useSelector(selectUserFirstName);
   const lastName = useSelector(selectUserLastName);

   useEffect(() => {
      dispatch(fetchOrUpdateUserProfile);
   }, [dispatch]);

   return (
      <div className="header">
         <h1 className="header-text">
            Welcome back
            <br />
            {firstName} {lastName} !
         </h1>
         <button className="edit-button">Edit Name</button>
      </div>
   );
}
