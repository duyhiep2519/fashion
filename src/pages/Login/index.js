import axiosClient from "api/axiosClient";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "redux/ducks/userSlice";
import "./Login.scss";
import { useHistory } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userLoginData, setUserLogin] = useState({
    email: "",
    password: "",
  });

  function handleLogin() {
    axiosClient
      .post("/user/login", userLoginData)
      .then((response) => {
        dispatch(userLogin(response));
        setTimeout(() => {
          history.push("/");
        }, 500);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="login">
      <div className="form__login">
        <div className="register">
          <h1>LOGIN</h1>
          <div className="register-form">
            <div className="register-input">
              <input
                type="email"
                placeholder="Email"
                value={userLoginData.email}
                onChange={(e) =>
                  setUserLogin({
                    ...userLoginData,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="register-input">
              <input
                type="password"
                placeholder="Password"
                value={userLogin.password}
                onChange={(e) =>
                  setUserLogin({
                    ...userLoginData,
                    password: e.target.value,
                  })
                }
              />
            </div>
            <div className="register-input">
              <input
                type="submit"
                value="Login"
                className="register-btn"
                onClick={handleLogin}
              />
            </div>
            <a href="/register">Create account</a>
            <a href="/">Return to store</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
