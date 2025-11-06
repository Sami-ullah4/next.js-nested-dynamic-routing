// app/blog/page.js
import Link from 'next/link';

async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export default async function Artical() {
  const posts = await fetchPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-6">
        {posts.slice(0, 10).map((post) => (
          <Link 
            href={`/artical/${post.id}`} 
            key={post.id}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2 capitalize">
              {post.title}
            </h2>
            <p className="text-gray-600">{post.body}</p>
            <span className="text-blue-600 text-sm mt-2 inline-block">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}