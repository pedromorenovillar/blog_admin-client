function NewPost() {
    // For example, after publishing a post, instead of re-fetching everything, you could update the relevant item in state:
//   setPosts((posts) =>
//   posts.map((post) =>
//     post.id === updatedPost.id ? updatedPost : post
//   )
// );
  return (
    <>
      <h1>NewPost</h1>
    </>
  );
}

export default NewPost;
