import { gql } from "graphql-request";
import { client } from "../../../../lib/graphql-client";
import Image from "next/image";

export default async function BlogSingle({ params }) {
  // ✅ Get slug from dynamic route
  const { slug } =await params;
  console.log("Slug from URL:", slug);

  // ✅ GraphQL query (kept same as your provided one)
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
      }
    }
  `;

  // ✅ Fetch data from GraphQL
  const data = await client.request(query);

  // ✅ Find the post matching the slug param
  const post = data.posts.nodes.find((p) => p.slug === slug);

  // ✅ Handle missing post
  if (!post) {
    return (
      <main style={{ padding: "20px" }}>
        <h2>❌ Post Not Found</h2>
        <p>No post found for slug: {slug}</p>
      </main>
    );
  }

  // ✅ Render the post
  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>{post.title}</h1>
      <p style={{ color: "#777" }}>{new Date(post.date).toDateString()}</p>

      {post.featuredImage?.node?.mediaDetails?.sizes?.[0]?.sourceUrl && (
        <Image
          src={post.featuredImage.node.mediaDetails.sizes[0].sourceUrl}
          alt={post.title}
          width={800}
          height={450}
          style={{ borderRadius: "10px", margin: "20px 0" }}
        />
      )}

      <div
        dangerouslySetInnerHTML={{ __html: post.excerpt }}
        style={{ lineHeight: "1.8", color: "#333" }}
      />
    </main>
  );
}
