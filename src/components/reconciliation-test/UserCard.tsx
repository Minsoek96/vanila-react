import { useRouter } from "@/libs/router";
import { styles } from "@/style";

export default function UserCard({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        margin: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
        }}
      >
        User ID: {userId}
      </h2>
      <p
        style={{
          color: "#666",
        }}
      >
        Post ID: {postId}
      </p>
      <button
        onClick={handleBack}
        style={{ ...styles.button, ...styles.cancelButton }}
      >
        뒤로가기
      </button>
    </div>
  );
}
