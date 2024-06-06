async function PostsList() {
  const posts = await prisma.post.fineMany();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1>Posts List (0):</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}
            <p>{post.content}</p>
          </li>
        ))}
        <li></li>
      </ul>
    </div>
  );
}

export default PostsList;
