import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/blog/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, []);

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
      </div>
    </>
  );
}

export default Post;
