import React from 'react';
import CreateTourComp from '../../components/tour/createTour';
function onCreateTourListener(tourData) {
  console.log(tourData);
}
function CreateTour(props) {
  return <CreateTourComp onCreateTour={onCreateTourListener} />;
}
export default CreateTour;
