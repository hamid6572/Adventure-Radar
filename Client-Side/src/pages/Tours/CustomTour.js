import React from 'react';
import CustomTourComp from '../../components/bookings/CustomTour';
function onCustomTourListener(tourData) {
  console.log(tourData);
}
function CustomTour(props) {
  return <CustomTourComp onCreateTour={onCustomTourListener} />;
}
export default CustomTour;
