import React from 'react';
import CreateTourComp from '../../components/tour/createTour';
import NotLogin from '../NotLogin';
function onCreateTourListener(tourData) {
  console.log(tourData);
}
function CreateTour(props) {
  return localStorage.getItem('userId') !== null ? (
    <CreateTourComp onCreateTour={onCreateTourListener} />
  ) : (
    <NotLogin />
  );
}
export default CreateTour;
