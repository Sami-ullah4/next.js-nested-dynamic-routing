import { gql } from "graphql-request";
import { client } from "../../../lib/graphql-client";
import Link from "next/link";

export default async function Blogs() {
  // ✅ Keep your exact GraphQL query
  const query = gql`
    query {
      posts {
        nodes {
          date
          excerpt(format: RENDERED)
          slug
          title
          featuredImage {
            node {
              mediaDetails {
                sizes {
                  sourceUrl
                  width
                  height
                }
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
    }
  `;

  try {
    // ✅ Fetch the data
    const data = await client.request(query);

    // ✅ Check for missing or empty data
    if (!data?.posts?.nodes?.length) {
      return (
        <main style={{ padding: "20px" }}>
          <h2>⚠️ No Posts Found</h2>
          <p>No blog posts were found in your GraphQL data.</p>
        </main>
      );
    }

    // ✅ Debugging log (optional)
    // console.log("Fetched post slugs:", data.posts.nodes.map((p) => p.slug));

    // ✅ Render only post titles with links
    return (
      <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h1 style={{ marginBottom: "20px" }}>📰 All Blog Posts</h1>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {data.posts.nodes.map((post) => (
            <li key={post.slug} style={{ marginBottom: "12px" }}>
              {console.log(post.slug)}
              <Link
                href={`/blogs/${post.slug}`}
                style={{
                  color: "#0070f3",
                  textDecoration: "none",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    );
  } catch (error) {
    // ✅ Catch GraphQL / network errors
    console.error("GraphQL fetch error:", error);

    return (
      <main style={{ padding: "20px", color: "red" }}>
        <h2>❌ Failed to Load Posts</h2>
        <p>Could not fetch posts from the GraphQL API.</p>
        <pre style={{ background: "#f9f9f9", padding: "10px" }}>
          {error.message}
        </pre>
      </main>
    );
  }
}
