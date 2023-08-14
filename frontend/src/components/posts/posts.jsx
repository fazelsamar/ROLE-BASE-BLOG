import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./post";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/blog/posts/`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

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
      </div>
    </>
  );
}

export default Posts;
