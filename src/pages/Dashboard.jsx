import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllUserPosts, toggleStatus } from "../api/posts";

function Dashboard() {
  const { user, isAuthenticated, accessToken } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function handlePublishStatus(post) {
    try {
      // Contact API
      const updatedPost = await toggleStatus(
        post.isPublished,
        post.id,
        accessToken,
      );
      // Update state of the changed post
      setPosts((posts) =>
        posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
      );
    } catch (error) {
      setError(error);
    }
    // Update posts
  }
  async function handleDelete(postId) {
    console.log(`deleting post:`, postId);
  }
  async function handleEdit(postId) {
    console.log(`editing post:`, postId);
  }

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
  }, [accessToken]);

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
                <button onClick={() => handleEdit(post.id)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
                <button onClick={() => handlePublishStatus(post)}>
                  {post.isPublished ? "Unpublish" : "Publish"}
                </button>
              </li>
            </div>
          ))}
        </ul>
      )}
    </>
  );
}

export default Dashboard;
