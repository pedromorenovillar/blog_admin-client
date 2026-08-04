import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { savePost, getSinglePost } from "../api/posts";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState([]);
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  // Convert errors array to object
  const fieldErrors = Object.fromEntries(
    errors.map(({ path, msg }) => [path, msg]),
  );

  function handleChange(event) {
    const target = event.target.name;

    if (target === "title") {
      setTitle(event.target.value);
    } else {
      setContent(event.target.value);
    }

    // Clear after a successful submit
    setErrors((prevErrors) => {
      return prevErrors.filter((error) => error.path !== target);
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSending(true);
    try {
      await savePost(title, content, accessToken, "PUT", id);
      setContent("");
      setTitle("");
      navigate("/");
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors([{ msg: error.message }]);
      }
    } finally {
      setIsSending(false);
    }
  }

  useEffect(() => {
    async function loadPost() {
      try {
        const post = await getSinglePost(id);
        setTitle(post.title);
        setContent(post.content);
        
      } catch (error) {
        if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors([{ msg: error.message }]);
      }
      }
    }

    loadPost();
  }, [id]);

  return (
    <>
      <h1>Edit Post</h1>

      <form onSubmit={handleSubmit}>
        {fieldErrors.title && <p>{fieldErrors.title}</p>}
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={title} onChange={handleChange} />
        <label htmlFor="content">Content</label>
        {fieldErrors.content && <p>{fieldErrors.content}</p>}
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

export default EditPost;
