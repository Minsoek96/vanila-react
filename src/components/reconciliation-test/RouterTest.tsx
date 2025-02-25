import { useState } from "@/libs/hooks";
import { useRouter } from "@/libs/router";
import { styles } from "@/style";

export default function RouterTest() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [postId, setPostId] = useState<string>("");

  const onReset = () => {
    setPostId("");
    setUserId("");
  };

  const onSubmit = (e: Event) => {
    e.preventDefault();
    router.push(`/users/${userId}/posts/${postId}`);
    onReset();
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        <input
          style={styles.input}
          value={userId}
          onChange={(e: Event) =>
            setUserId((e.target as HTMLInputElement).value)
          }
          placeholder="User ID"
        />
        <input
          style={styles.input}
          value={postId}
          onChange={(e: Event) =>
            setPostId((e.target as HTMLInputElement).value)
          }
          placeholder="Post ID"
        />
        <button
          type="submit"
          style={{ ...styles.button, ...styles.saveButton }}
        >
          DynamicTest
        </button>
      </form>
    </section>
  );
}
