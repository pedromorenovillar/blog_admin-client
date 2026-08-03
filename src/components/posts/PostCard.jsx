import { Link } from "react-router-dom"; // <- Client side nav without reloading

function PostCard({ post }) {
  return (
    <>
      <li>
        <Link to={`/posts/${post.id}/${post.slug}`}>
          <h2>{post.title}</h2>
        </Link>
        <h3>
          {post.content.length > 50
            ? post.content.slice(0, 50) + "..."
            : post.content}{" "}
          | {new Date(post.createdAt).toLocaleDateString()}
        </h3>
      </li>
    </>
  );
}

export default PostCard;
