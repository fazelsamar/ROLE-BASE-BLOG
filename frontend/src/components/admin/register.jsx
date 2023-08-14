import React, { useState } from "react";

function Register() {
  const [user, setUser] = useState({});

  const doSubmitLogin = async () => {
    const formData = new FormData();
    for (var key in user) {
      formData.append(key, user[key]);
    }
    fetch(`http://127.0.0.1:8000/account/login/`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status == 401) {
          alert("Not found");
        }
      })
      .then((data) => {
        if (data) {
          window.localStorage.setItem("token", data["token"]);
          window.location.replace("/admin");
        }
      });
  };

  const doSubmitRegister = async () => {
    const formData = new FormData();
    for (var key in user) {
      formData.append(key, user[key]);
    }
    fetch(`http://127.0.0.1:8000/account/register/`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status === 201) {
          alert("Register was successful");
          return response.json();
        }
        if (response.status == 400) {
          alert("Bad request");
          console.log(response);
        }
      })
      .then((data) => {
        if (data) {
          window.localStorage.setItem("token", data["token"]);
          window.location.replace("/admin");
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = ({ currentTarget: input }) => {
    user[input.name] = input.value;
    setUser(user);
  };

  const handleLogin = () => {
    doSubmitLogin();
  };

  const handleRegister = () => {
    doSubmitRegister();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            value={user.username}
            onChange={handleChange}
            name="username"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={user.password}
            onChange={handleChange}
            name="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <a
          //   type="submit"
          onClick={handleLogin}
          className="btn btn-primary"
          style={{ marginRight: "5px" }}
        >
          Login
        </a>
        <a
          //   type="submit"
          onClick={handleRegister}
          className="btn btn-primary"
        >
          Register
        </a>
      </form>
    </>
  );
}

export default Register;
