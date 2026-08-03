import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getSinglePost } from "../api/posts";
import { deleteComment } from "../api/comments";
import { AuthContext } from "../context/AuthContext";
import CommentForm from "../components/common/CommentForm";

function SinglePost() {
  const [post, setPost] = useState();
  const [error, setError] = useState(null);
  const { user, isAuthenticated, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  function handleClick() {
    navigate("/users/login", { state: location });
  }

  async function reloadPost() {
    const updatedPost = await getSinglePost(id);
    setPost(updatedPost);
  }

  async function handleDelete(commentId) {
    try {
      if (!window.confirm("Delete this comment?")) {
        return;
      }
      await deleteComment(commentId, accessToken);
      await reloadPost();
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    async function loadPost(id) {
      try {
        const post = await getSinglePost(id);
        setPost(post);
        document.title = post.title;
      } catch (error) {
        setError(error.message);
      }
    }
    loadPost(id);
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h2>
        {post.title} | {new Date(post.createdAt).toLocaleDateString()}
      </h2>
      <div>
        by {post.author.firstname} {post.author.lastname}
      </div>
      <h3>{post.content}</h3>
      <h4>Comments</h4>
      {post.comments.length === 0 ? (
        <p>This post has no comments.</p>
      ) : (
        post.comments.map((comment) => (
          <div key={comment.id}>
            <p>
              {comment.author.firstname}: {comment.content} |{" "}
              {new Date(comment.updatedAt).toLocaleDateString()}
              {isAuthenticated && comment.authorId === user.id && (
                <button onClick={() => handleDelete(comment.id)}>Delete</button>
              )}
            </p>
          </div>
        ))
      )}
      {isAuthenticated ? (
        <CommentForm postId={post.id} onCommentCreated={reloadPost} />
      ) : (
        <button onClick={handleClick}>Log in to comment</button>
      )}
    </>
  );
}

export default SinglePost;
