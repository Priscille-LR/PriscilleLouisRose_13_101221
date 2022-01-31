import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
   fetchUserProfile,
   resetUserData,
   updateUserProfile,
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
         dispatch(fetchUserProfile());
      }
   }, [dispatch, isEditName, firstName, lastName]);

   //display inputs if editing
   const toggle = () => {
      setIsEditName(!isEditName);
   };

   //get back old value
   const cancelEdit = () => {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      toggle();
   };

   const handleSubmit = async (e) => {
      //prevent submit if data is invalid
      if (firstName === '' || lastName === '') {
         e.preventDefault();
      } else {
         dispatch(resetUserData());
         dispatch(updateUserProfile(firstName, lastName));
         setIsEditName(false);
      }
   };

   const nameInputs = (
      <div className="name-inputs">
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
      <div className="save-cancel-buttons">
         <button className="edit-button" onClick={cancelEdit}>
            Cancel
         </button>
         <button className="edit-button" onClick={handleSubmit}>
            Save
         </button>
      </div>
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
}
