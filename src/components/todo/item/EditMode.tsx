import { styles } from "@/style/styles";

type EditModeProps = {
  text: string;
  onSubmit: (e: Event) => void;
  onChange: (e: Event) => void;
  onCancel: () => void;
};

export default function EditMode({
  text,
  onSubmit,
  onChange,
  onCancel,
}: EditModeProps) {
  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <input
        type="text"
        value={text}
        onChange={onChange}
        style={styles.input}
      />
      <div style={styles.buttonContainer}>
        <button
          type="submit"
          style={{ ...styles.button, ...styles.saveButton }}
        >
          저장
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{ ...styles.button, ...styles.cancelButton }}
        >
          취소
        </button>
      </div>
    </form>
  );
}
