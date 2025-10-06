// ===================================================================
// TEMPORARY DEBUGGING COMPONENT
// This file has been simplified to isolate routing and rendering issues.
// ===================================================================

// The original data fetching and Notion logic have been removed for this test.

type Props = {
  params: { slug: string };
};

// This is a simple Server Component that does not fetch any data.
export default async function BlogPostPage({ params }: Props) {
  const { slug } = params;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      backgroundColor: '#f0f0f0',
      color: '#333',
      padding: '20px',
      textAlign: 'center',
    }}>
      <div style={{
        padding: '40px',
        border: '2px dashed #ccc',
        borderRadius: '10px',
        backgroundColor: '#fff',
      }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0070f3', marginBottom: '1rem' }}>
          ✅ Page Render Test Successful!
        </h1>
        <p style={{ fontSize: '1.2rem' }}>
          If you can see this message, the basic Next.js routing and Vercel deployment are working correctly.
        </p>
        <p style={{ marginTop: '2rem' }}>The requested slug is:</p>
        <p style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#d63384',
          backgroundColor: '#fce4ec',
          padding: '10px 20px',
          borderRadius: '5px',
          marginTop: '0.5rem',
        }}>
          {slug}
        </p>
      </div>
    </div>
  );
}

// By removing generateStaticParams, we force every page to be dynamically rendered on request.
// This helps isolate the problem from build-time static generation.

/*
// Original generateStaticParams has been commented out for this test.
export async function generateStaticParams() {
  // const posts = await getPublishedPosts()
  // return posts.map((post) => ({
  //   slug: post.slug,
  // }))
  return [];
}
*/
