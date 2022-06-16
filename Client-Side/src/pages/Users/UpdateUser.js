import React from 'react';
import UpdateUserComp from '../../components/user/UpdateUser';
import NotLogin from '../NotLogin';
function onUpdateUserListener(tourData) {
  console.log(tourData);
}
function UpdateUser(props) {
  return localStorage.getItem('userId') !== null ? (
    <UpdateUserComp onCreateTour={onUpdateUserListener} />
  ) : (
    <NotLogin />
  );
}
export default UpdateUser;
