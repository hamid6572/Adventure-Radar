import React from 'react';
import SignupComp from '../../components/auth/Signup';
function onSignupListener(userData) {
  console.log(userData);
}
function Signup(props) {
  return (
    <SignupComp
      onSignup={onSignupListener}
      user={props.user}
      setUser={props.setUser}
    />
  );
}
export default Signup;
