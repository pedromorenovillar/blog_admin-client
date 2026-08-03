import { useState, useContext } from "react";
import { addComment } from "../../api/comments";
import { AuthContext } from "../../context/AuthContext";

function CommentForm({ postId, onCommentCreated }) {
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState([]);
  const { accessToken } = useContext(AuthContext);

  // Convert errors array to object
  const fieldErrors = Object.fromEntries(
    errors.map(({ path, msg }) => [path, msg]),
  );

  function handleChange(event) {
    setContent(event.target.value);

    // Clear the textarea after a successful submit
    setErrors((prevErrors) => {
      return prevErrors.filter((error) => error.path !== "content");
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setIsSending(true);
      await addComment(postId, content, accessToken);
      setContent("");
      await onCommentCreated();
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors([{ msg: error.message }]);
      }
    }
    setIsSending(false);
    return;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {fieldErrors.content && <p>{fieldErrors.content}</p>}
        <input type="hidden" name="postId" value={postId} />
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          value={content}
          onChange={handleChange}
        ></textarea>
        <button type="submit" disabled={isSending}>
          Send
        </button>
      </form>
    </>
  );
}
export default CommentForm;
