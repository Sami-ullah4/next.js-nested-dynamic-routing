// app/blog/[id]/page.js
import Link from 'next/link';

async function fetchPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

// This is the KEY part - accessing the dynamic parameter
export default async function ArticalPostPage({ params }) {
  // 'params.id' contains the ID from the URL
  const post = await fetchPost(params.id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link href="/artical" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to all posts
      </Link>
      
      <article className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-4">
          <span className="text-sm text-gray-500">Post #{post.id}</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-6 capitalize">
          {post.title}
        </h1>
        
        <p className="text-lg text-gray-700 leading-relaxed">
          {post.body}
        </p>
        
        <div className="mt-8 pt-4 border-t">
          <p className="text-sm text-gray-500">Author ID: {post.userId}</p>
        </div>
      </article>
    </div>
  );
}

// Generate static params (optional, for better performance)
export async function generateStaticParams() {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json());
  
  return posts.slice(0, 10).map((post) => ({
    id: post.id.toString(),
  }));
}