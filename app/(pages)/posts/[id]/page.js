import Link from "next/link";

export default async function SinglePost({ params }) {
  // ✅ unwrap params Promise first
  const resolvedParams = await params;
  console.log("✅ Params:", resolvedParams);

  // Validate param
  if (!resolvedParams?.id) {
    return (
      <main style={{ padding: "20px" }}>
        <h2>❌ Invalid URL</h2>
        <p>No post ID provided in the URL.</p>
      </main>
    );
  }

  // Fetch post
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${resolvedParams.id}`
  );

  if (!res.ok) {
    return (
      <main style={{ padding: "20px" }}>
        <h2>⚠️ Post Not Found</h2>
        <p>Sorry, the post with ID {resolvedParams.id} could not be loaded.</p>
      </main>
    );
  }

  const post = await res.json();

  if (!post || Object.keys(post).length === 0) {
    return (
      <main style={{ padding: "20px" }}>
        <h2>🚫 No Data</h2>
        <p>Post data is missing or invalid.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "20px" }}>
      <h2>📰 {post.title}</h2>
      <p>{post.body}</p>

      <Link
        href={`/posts/${resolvedParams.id}/comments/1`}
        style={{ color: "red", display: "block", marginTop: "20px" }}
      >
        View First Comment →
      </Link>
    </main>
  );
}
