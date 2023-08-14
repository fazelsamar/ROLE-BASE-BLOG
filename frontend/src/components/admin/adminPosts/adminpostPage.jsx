import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AdminPost() {
  const { id } = useParams();
  const [permissions, setPermissions] = useState([]);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [post, setPost] = useState({});
  const [editPost, setEditPost] = useState({});

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
          setPermissions(res.data["permissions"]);
          setIsSuperuser(res.data["is_superuser"]);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          localStorage.removeItem("permissions");
          localStorage.removeItem("is_superuser");
          setPermissions(false);
          setIsSuperuser(null);
        });
    }
    localStorage.removeItem("permissions");
    localStorage.removeItem("is_superuser");
    setPermissions(false);
    setIsSuperuser(null);
  };
  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_API}/blog/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
    fetchUser();
  }, []);

  const deleteHandler = () => {
    axios
      .delete(`http://${process.env.REACT_APP_API}/blog/posts/${id}`, {
        headers: {
          Authorization: "Token  " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        alert("Deleted");

        window.location.replace("/admin/posts");
      })
      .catch((err) => alert("something went wrong"));
  };

  const doSubmit = async () => {
    var token = localStorage.getItem("token");

    const formData = new FormData();
    for (var key in editPost) {
      formData.append(key, editPost[key]);
    }
    fetch(`http://${process.env.REACT_APP_API}/blog/posts/${id}/`, {
      method: "PATCH",
      body: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "Token  " + token,
      },
    }).then((response) => {
      if (response.status === 200) {
        alert("Updated");
        window.location.replace(`/admin/posts/${id}`);
      }
      if (response.status == 400) {
        alert("Bad request");
        console.log(response);
      }
      if (response.status == 403) {
        alert("Something wrong");
        console.log(response);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doSubmit();
  };

  const handleChange = ({ currentTarget: input }) => {
    editPost[input.name] = input.value;
    setEditPost(editPost);
  };

  const handleChangeImage = (e) => {
    editPost["image"] = e.target.files[0];
    setEditPost(editPost);
  };

  const handleChangeFile = (e) => {
    editPost["file"] = e.target.files[0];
    setEditPost(editPost);
  };

  return (
    <>
      <img
        className="card-img-top"
        src={post.image}
        alt="Card image cap"
        style={{ width: "500px" }}
      />
      <div className="card-body">
        <br />
        <h5 className="card-title">{post.title}</h5>
        <br />
        <p className="card-text">{post.description}</p>
        {post.file ? <a href={post.file}>File</a> : null}
        {/* {Array.from(permissions).includes("delete_post")} */}
        {isSuperuser || Array.from(permissions).includes("delete_post") ? (
          <>
            <br />
            <br />
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteHandler}
              style={{ marginRight: "5px" }}
            >
              Delete
            </button>
          </>
        ) : null}
      </div>

      {isSuperuser || Array.from(permissions).includes("edit_post") ? (
        <>
          <br />
          <hr />
          <div className="col-12 mb-5">
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby="emailHelp"
                  value={editPost.title}
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  value={editPost.description}
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  aria-describedby="emailHelp"
                  accept="image/*"
                  value={editPost.image}
                  name="image"
                  onChange={handleChangeImage}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  File
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  aria-describedby="emailHelp"
                  value={editPost.file}
                  name="file"
                  onChange={handleChangeFile}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </>
      ) : null}
    </>
  );
}

export default AdminPost;
