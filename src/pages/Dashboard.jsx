import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllUserPosts, toggleStatus, deletePost } from "../api/posts";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const { user, isAuthenticated, accessToken } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handlePublishStatus(post) {
    try {
      // Contact API
      const updatedPost = await toggleStatus(
        post.isPublished,
        post.id,
        accessToken,
      );
      // Replace post in state with the one returned from the server
      setPosts((posts) =>
        posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
      );
    } catch (error) {
      setError(error.message);
    }
  }
  async function handleDelete(postId) {
    try {
      // Contact API
      const deletedPost = await deletePost(postId, accessToken);

      // Filter out from state the post returned from the server
      setPosts((posts) => posts.filter((post) => post.id !== deletedPost.id));
    } catch (error) {
      setError(error.message);
    }
  }
  function handleEdit(postId) {
    // Pass the post ID to editpost
    navigate(`/posts/${postId}/edit`);
  }

  useEffect(() => {
    // Avoid unnecessary request if authentication is being established
    if (!accessToken) return;
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
  return (
    <div className="MainContent">
      {isAuthenticated ? (
        <>
          <h1>Hello, {user.firstname}!</h1>
          <p>
            As an author, you can create, delete, edit and publish/unpublish
            your posts.
          </p>
          <p>You can also see other author's posts and comment on them.</p>
        </>
      ) : (
        <h1>Dashboard</h1>
      )}
      <div className={styles.Container}>
        <h1>Your posts</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className={styles.PostList}>
            {posts.map((post) => (
              <li key={post.id} className={styles.ListItem}>
                <div className={styles.PostData}>
                  <div className={styles.PostTitle}>{post.title}</div>
                  <div className={styles.PostDate}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  <div
                    className={`${styles.PostPublished} ${!post.isPublished && `${styles.PostNotPublished}`}`}
                  >
                    {post.isPublished ? "Published" : "Not published"}
                  </div>
                </div>
                <button onClick={() => handleEdit(post.id)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
                <button onClick={() => handlePublishStatus(post)}>
                  {post.isPublished ? "Unpublish" : "Publish"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
