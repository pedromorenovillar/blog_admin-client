import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllUserPosts } from "../api/posts";

function Dashboard() {
  const { user, isAuthenticated, accessToken } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const userPosts = await getAllUserPosts(accessToken);
        setPosts(userPosts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }
  // id, authorId, title, content, createdAt, updatedAt, isPublished, slug
  return (
    <>
      {isAuthenticated ? (
        <h1>Hello, {user.firstname}, you are an author.</h1>
      ) : (
        <h1>Dashboard</h1>
      )}
      <h1>Your posts</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <div key={post.id}>
              <li>
                {post.title} | {new Date(post.updatedAt).toLocaleDateString()} |
                {post.isPublished ? "Published" : "Not published"}
              </li>
            </div>
          ))}
        </ul>
      )}
    </>
  );
}

export default Dashboard;
