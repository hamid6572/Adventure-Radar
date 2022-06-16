import React from 'react';
import UpdateTourComp from '../../components/tour/UpdateTour';
import NotLogin from '../NotLogin';
function onUpdateTourListener(tourData) {
  console.log(tourData);
}
function UpdateTour(props) {
  return localStorage.getItem('userId') !== null ? (
    <UpdateTourComp onCreateTour={onUpdateTourListener} />
  ) : (
    <NotLogin />
  );
}
export default UpdateTour;
