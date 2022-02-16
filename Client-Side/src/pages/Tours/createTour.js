import React from "react";
import createTourComp from "../../components/createTour";
function onSignupListener(tourData) {
	console.log(tourData);
}
function CreateTour(props) {
	return (
		<createTourComp
			onCreateTour={onCreateTourListener}

		/>
	);
}
export default CreateTour;
