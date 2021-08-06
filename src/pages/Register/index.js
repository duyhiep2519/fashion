import axiosClient from "api/axiosClient";
import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    photo:
      "https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-hoat-hinh-de-thuong-1.jpg",
  });

  const handleRegister = () => {
    setLoading(true);
    axiosClient
      .post("/user/signup", user)
      .then((response) => {
        setTimeout(() => {
          alert("Account successfully created");
          history.push("/login");
          setLoading(false);
        }, 800);
      })
      .catch((error) => {
        alert(error.response.data);
        setLoading(false);
      });
  };
  return (
    <div className="register">
      <h1>CREATE ACCOUNT</h1>
      <div className="register-form">
        <div className="register-input">
          <input
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={(event) => setUser({ ...user, name: event.target.value })}
          />
        </div>
        <div className="register-input">
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(event) =>
              setUser({ ...user, email: event.target.value })
            }
          />
        </div>
        <div className="register-input">
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(event) =>
              setUser({ ...user, password: event.target.value })
            }
          />
        </div>
        <div className="register-input">
          <button
            type="button"
            className="register-btn"
            onClick={handleRegister}
          >
            {loading ? (
              <ClipLoader loading={loading} size={15} color="black" />
            ) : (
              "Create"
            )}
          </button>
        </div>
        <a href="/">Return to store</a>
      </div>
    </div>
  );
};

export default Register;
