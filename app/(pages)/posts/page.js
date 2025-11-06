export default async function Posts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  console.log(posts);

  return (
    <main style={{ padding: "20px" }}>
      <h1>📚 All Posts</h1>
      <ul>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id}>
            <a
              href={`/posts/${post.id}`}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
