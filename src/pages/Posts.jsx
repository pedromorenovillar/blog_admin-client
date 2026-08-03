import { useEffect, useState } from "react";
import { getPublishedPosts } from "../api/posts";
import PostCard from "../components/posts/PostCard";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const publishedPosts = await getPublishedPosts();
        setPosts(publishedPosts);
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

  return (
    <>
      <h1>Posts</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <div key={post.id}>
              <PostCard post={post} />
            </div>
          ))}
        </ul>
      )}
    </>
  );
}

export default Posts;
