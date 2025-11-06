import Link from "next/link";

export default async function CommentDetail({ params }) {
  // ✅ Unwrap the params Promise first
  const resolvedParams = await params;
  console.log("Resolved Params:", resolvedParams);

  // ✅ Extract the ID
  const { commentsId, id } = resolvedParams;

  // ✅ Fetch the correct comment
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments/${commentsId}`
  );

  if (!res.ok) {
    return (
      <main style={{ padding: "20px" }}>
        <h2>⚠️ Comment Not Found</h2>
        <p>Could not load comment #{commentsId}.</p>
      </main>
    );
  }

  const comment = await res.json();

  return (
    <main style={{ padding: "20px" }}>
      <h2>💬 Comment #{comment.id}</h2>
      <p><strong>Name:</strong> {comment.name}</p>
      <p><strong>Email:</strong> {comment.email}</p>
      <p>{comment.body}</p>

      <Link
        href={`/posts/${id}`}  // ✅ Go back to the correct post
        style={{ color: "blue", display: "block", marginTop: "20px" }}
      >
        ← Back to Post
      </Link>
    </main>
  );
}
