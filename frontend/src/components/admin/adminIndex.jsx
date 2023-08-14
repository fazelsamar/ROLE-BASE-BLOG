import React, { useState, useEffect } from "react";
import axios from "axios";
import Register from "./register";
import { Link } from "react-router-dom";

function AdminIndex() {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [isSuperuser, setIsSuperuser] = useState(false);

  const fetchUser = () => {
    var token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`http://127.0.0.1:8000/account/me/`, {
          headers: {
            Authorization: "Token  " + token,
          },
        })
        .then((res) => {
          setUser(res.data);
          setPermissions(res.data["permissions"]);
          setIsSuperuser(res.data["is_superuser"]);
          window.localStorage.setItem("permissions", res.data["permissions"]);
          window.localStorage.setItem("is_superuser", res.data["is_superuser"]);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          localStorage.removeItem("permissions");
          localStorage.removeItem("is_superuser");
          setPermissions(false);
          setIsSuperuser(null);
        });
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");
    localStorage.removeItem("is_superuser");
    window.location.replace("/admin");
  };

  return (
    <>
      {!user ? (
        <Register />
      ) : (
        <>
          <button
            type="button"
            className="btn btn-danger"
            onClick={logoutHandler}
            style={{ marginRight: "5px" }}
          >
            Log out
          </button>
          <Link
            to="/admin/posts"
            className="btn btn-primary"
            style={{ marginRight: "5px" }}
          >
            Posts
          </Link>
          {isSuperuser ||
          Array.from(permissions).includes("user_management") ? (
            <Link
              to="/admin/users"
              className="btn btn-primary"
              style={{ marginRight: "5px" }}
            >
              Users
            </Link>
          ) : null}
          <Link
            to="/admin/site-settings"
            className="btn btn-primary"
            style={{ marginRight: "5px" }}
          >
            Site Settings
          </Link>
        </>
      )}
    </>
  );
}

export default AdminIndex;
