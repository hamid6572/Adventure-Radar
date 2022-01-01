import React from "react";
import SignupComp from "../../components/auth/Signup";
function onSignupListener(userData){
  console.log(userData);
}
function Signup(){
  return (
     <SignupComp onSignup={onSignupListener}/>
    );
};
export default Signup;
