import { Link } from "react-router-dom";

function PostPage({ post }) {
  return (
    <div className="card">
      <img className="card-img-top" src={post.image} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.description}</p>
        <Link to={"/admin/posts/" + post.id} className="btn btn-primary">
          Details
        </Link>
      </div>
    </div>
  );
}

export default PostPage;
