const API_URL = import.meta.env.VITE_API_URL; // <-- In Vite, environment variables are exposed through import.meta.env. Variables should start with VITE_

export async function getPublishedPosts() {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

export async function getSinglePost(id) {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json();
}

export async function getAllUserPosts(token) {
  const response = await fetch(`${API_URL}/posts/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

export async function toggleStatus(status, postId, token) {
  const action = !status ? "publish" : "unpublish";
  const response = await fetch(`${API_URL}/posts/${postId}/${action}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to ${action}`);
  }
  return response.json();
}

export async function deletePost(postId, token) {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to delete the post`);
  }
  return response.json();
}
