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
