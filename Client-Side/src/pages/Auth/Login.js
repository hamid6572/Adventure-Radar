import React from 'react';
import LoginComp from '../../components/auth/Login';
function onLoginListener(userData) {
  console.log(userData);
}
function Login(props) {
  console.log(props.user);
  return (
    <LoginComp
      user={props.user}
      setUser={props.setUser}
      onSignup={onLoginListener}
    />
  );
}
export default Login;
