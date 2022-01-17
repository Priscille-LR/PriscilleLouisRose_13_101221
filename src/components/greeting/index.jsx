import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
   fetchOrUpdateUserProfile,
   resetUserData,
} from '../../redux/features/userProfile';
import { selectUserInfo, selectUserStatus } from '../../redux/utils/selectors';
import Loader from '../utils';
import './greeting.css';

export function Greeting() {
   const userInfo = useSelector(selectUserInfo);
   const status = useSelector(selectUserStatus);

   const [isEditName, setIsEditName] = useState(false);
   const [firstName, setFirstName] = useState(userInfo.firstName);
   const [lastName, setLastName] = useState(userInfo.lastName);

   const dispatch = useDispatch();

   useEffect(() => {
      if (!isEditName) {
         dispatch(fetchOrUpdateUserProfile(isEditName, firstName, lastName));
      }
   }, [dispatch, isEditName, firstName, lastName]);

   const toggle = () => {
      //display inputs if editing
      setIsEditName(!isEditName);
   };

   const cancelEdit = () => {
      //get back old value
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      toggle();
   };

   const handleSubmit = async (e) => {
      if (firstName === '' || lastName === '') {
         //prevent submit if invalid data
         e.preventDefault();
      } else {
         dispatch(resetUserData());
         dispatch(fetchOrUpdateUserProfile(isEditName, firstName, lastName));
         setIsEditName(false);
      }
   };

   const nameInputs = (
      <div>
         <input
            type="text"
            id="firstname"
            value={firstName || ''}
            onChange={(e) => setFirstName(e.target.value)}
         />

         <input
            type="text"
            id="lastname"
            value={lastName || ''}
            onChange={(e) => setLastName(e.target.value)}
         />
      </div>
   );

   const editNameButton = (
      <button className="edit-button" onClick={toggle}>
         Edit Name
      </button>
   );

   const saveNameButton = (
      <>
         <button className="edit-button" onClick={cancelEdit}>
            Cancel
         </button>
         <button className="edit-button" onClick={handleSubmit}>
            Save change
         </button>
      </>
   );

   return status === 'pending' || status === 'void' ? (
      <div className="loader-wrapper">
         <Loader />
      </div>
   ) : (
      <div className="header">
         <h1 className="header-text">
            Welcome back
            <br />
            {isEditName
               ? nameInputs
               : `${userInfo.firstName} ${userInfo.lastName} !`}
         </h1>
         {isEditName ? saveNameButton : editNameButton}
      </div>
   );

   // return (
   //    <div className="header">
   //       <h1 className="header-text">
   //          Welcome back
   //          <br />
   //          {firstName} {lastName} !
   //       </h1>
   //       <button className="edit-button">Edit Name</button>
   //    </div>
   // );
}
