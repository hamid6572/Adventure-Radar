import React from 'react';
import CustomTourComp from '../../components/bookings/CustomTour';
import NotLogin from '../NotLogin';
function onCustomTourListener(tourData) {
  console.log(tourData);
}
function CustomTour(props) {
  return localStorage.getItem('userId') !== null ? (
    <CustomTourComp onCreateTour={onCustomTourListener} />
  ) : (
    <NotLogin />
  );
}
export default CustomTour;
