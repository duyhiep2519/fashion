import axiosClient from "api/axiosClient";
import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogin } from "redux/ducks/userSlice";
import "./Login.scss";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  //handle  google login
  function responseSuccessGoogle(response) {
    console.log(response.tokenId);
    axiosClient
      .post("/user/login", {
        idToken: response.tokenId,
      })
      .then((res) => {
        dispatch(userLogin(res));
        history.goBack();
      })
      .catch((error) => {});
  }
  function responseErrorGoogle(response) {
    console.log(response);
  }
  return (
    <div className="login">
      <h1>Login</h1>
      <div className="auth__google">
        <GoogleLogin
          className="google-login"
          clientId="766423151097-um2alq61rhsnce9ar0af6a9hdp031d0n.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={"single_host_origin"}
        ></GoogleLogin>
        <span>Login with Google Account</span>
      </div>
    </div>
  );
}

export default Login;
