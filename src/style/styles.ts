import { styleMixin } from "@/style/stylemixin";

export const styles = {
  listItem: {
    ...styleMixin().flex("row", "center", "space-between", 12),
    padding: "8px",
    margin: "4px 0",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
  },
  form: {
    display: "flex",
    gap: "8px",
    flex: 1,
  },
  input: {
    flex: 1,
    padding: "4px 8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  buttonContainer: {
    display: "flex",
    gap: "4px",
  },
  button: {
    padding: "4px 8px",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  saveButton: {
    backgroundColor: "#348834",
  },
  cancelButton: {
    backgroundColor: "#e03529",
  },
  editButton: {
    backgroundColor: "#4ea9f3",
  },
  todoText: (completed: boolean) => ({
    flex: 1,
    cursor: "pointer",
    textDecoration: completed ? "line-through" : "none",
    textDecorationColor: completed ? "#ff6b6b" : "none",
    color: completed ? "#868e96" : "inherit",
  }),
  dateText: {
    marginLeft: "12px",
    color: "#868e96",
    fontSize: "0.9em",
  },
};
