export default function UserCard({
  userId,
  postId 
 }: {
  userId: string;
  postId: string;
 }) {
  return (
    <div style={{
      padding: "10px",
      border: "1px solid #ddd", 
      borderRadius: "8px",
      margin: "10px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{
        fontSize: "18px"
      }}>
        User ID: {userId}
      </h2>
      <p style={{
        color: "#666"
      }}>
        Post ID: {postId}
      </p>
    </div>
  );
 }
