import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./post";

function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [newPost, setNewPost] = useState({});

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
    fetchUser();
    axios
      .get(`http://${process.env.REACT_APP_API}/blog/posts/`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const doSubmit = async () => {
    var token = localStorage.getItem("token");

    const formData = new FormData();
    for (var key in newPost) {
      formData.append(key, newPost[key]);
    }
    fetch(`http://${process.env.REACT_APP_API}/blog/posts/`, {
      method: "POST",
      body: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "Token  " + token,
      },
    }).then((response) => {
      if (response.status === 201) {
        alert("Created");
        window.location.replace("/admin/posts");
      }
      if (response.status == 400) {
        alert("Bad request");
        console.log(response);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doSubmit();
  };

  const handleChange = ({ currentTarget: input }) => {
    newPost[input.name] = input.value;
    setNewPost(newPost);
  };

  const handleChangeImage = (e) => {
    newPost["image"] = e.target.files[0];
    setNewPost(newPost);
  };

  const handleChangeFile = (e) => {
    newPost["file"] = e.target.files[0];
    setNewPost(newPost);
  };

  return (
    <>
      <div className="row">
        {posts.map((post) => (
          <div
            className="col-sm-3"
            style={{ marginBottom: "10px" }}
            key={post.id}
          >
            <Post key={post.id} post={post} />
          </div>
        ))}

        {isSuperuser || Array.from(permissions).includes("create_post") ? (
          <>
            <br />
            <hr />
            <div className="col-12 mb-5">
              <h2>Create Post</h2>
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
                    required
                    value={newPost.title}
                    name="title"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    required
                    className="form-control"
                    id="description"
                    value={newPost.description}
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
                    required
                    value={newPost.image}
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
                    value={newPost.file}
                    name="file"
                    onChange={handleChangeFile}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </form>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default AdminPosts;
