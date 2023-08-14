import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ManageUsers() {
  const [permissions, setPermissions] = useState([]);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUser = () => {
    var token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`http://${process.env.REACT_APP_API}/account/me/`, {
          headers: {
            Authorization: "Token  " + token,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            setPermissions(res.data["permissions"]);
            setIsSuperuser(res.data["is_superuser"]);
          } else {
            window.location.replace(`/admin/`);
          }
        })
        .catch((err) => {
          setPermissions(false);
          setIsSuperuser(null);
          window.location.replace(`/admin/`);
        });
    } else {
      window.location.replace(`/admin/`);
    }
    localStorage.removeItem("permissions");
    localStorage.removeItem("is_superuser");
    setPermissions(false);
    setIsSuperuser(null);
  };

  const logoutHandler = (username) => {
    axios
      .get(`http://${process.env.REACT_APP_API}/account/logout/${username}`, {
        headers: {
          Authorization: "Token  " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        alert("Done");
        window.location.replace("/admin/users");
      })
      .catch((err) => alert("Something went wrong"));
  };

  useEffect(() => {
    fetchUser();
    axios
      .get(`http://${process.env.REACT_APP_API}/account/users/`, {
        headers: {
          Authorization: "Token  " + localStorage.getItem("token"),
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <ul className="list-group list-group-flush ">
        {users.map((user) => (
          <li className="list-group-item" key={user.username}>
            <button
              type="button"
              className="btn btn-danger  btn-sm"
              onClick={() => logoutHandler(user.username)}
              style={{ marginRight: "5px" }}
            >
              Log out username: {user.username}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ManageUsers;
