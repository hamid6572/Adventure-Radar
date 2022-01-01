import React from "react";
import LoginComp from "../../components/auth/Login";
function onLoginListener(userData){
  console.log(userData);
}
function Login(){
  return (
     <LoginComp onSignup={onLoginListener}/>
    );
};
export default Login;
