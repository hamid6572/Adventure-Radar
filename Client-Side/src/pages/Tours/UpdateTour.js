import React from 'react';
import UpdateTourComp from '../../components/tour/UpdateTour';
function onUpdateTourListener(tourData) {
  console.log(tourData);
}
function UpdateTour(props) {
  return <UpdateTourComp onCreateTour={onUpdateTourListener} />;
}
export default UpdateTour;
