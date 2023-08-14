import { Routes, Route } from "react-router-dom";
import Nav from "./components/common/nav";
import Posts from "./components/posts/posts";
import PostPage from "./components/posts/postPage";
import AdminIndex from "./components/admin/adminIndex";
import AdminPosts from "./components/admin/adminPosts/adminPosts";
import AdminPost from "./components/admin/adminPosts/adminpostPage";
import ManageUsers from "./components/admin/manageUsers";

function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/admin" element={<AdminIndex />} />
          <Route path="/admin/posts" element={<AdminPosts />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/site-settings" element={<AdminIndex />} />
          <Route path="/admin/posts/:id" element={<AdminPost />} />
          <Route path="/" element={<Posts />} />
          <Route path="/posts/:id" element={<PostPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
