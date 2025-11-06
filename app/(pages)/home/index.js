import { gql } from "graphql-request";
import { client } from "@/lib/graphql-client";

export default async function HomeIndex() {
  const query = gql`
    query {
      posts {
        nodes {
          id
          title
          content
        }
      }
    }
  `;

  const data = await client.request(query);

  // ✅ Log fetched posts
  console.log(data.posts.nodes);

  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📝 WordPress Posts</h1>
      <ul>
        {data.posts.nodes.map((post) => (
          <li key={post.id} style={{ marginBottom: "20px" }}>
            <strong>{post.title}</strong>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </li>
        ))}
      </ul>
    </main>
  );
}
