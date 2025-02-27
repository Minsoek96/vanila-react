import { Link } from "@/libs/router";
import { styleMixin } from "@/style";

export default function NavBar() {
  const { flex } = styleMixin();

  const navStyle = {
    ...flex("row", "center", "flex-start", 20),
    width: "100%",
    padding: "16px 24px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #e9ecef"
  };

  const linkStyle = {
    color: "#495057",
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    transition: "all 0.2s ease",
    fontSize: "16px",
    fontWeight: "500",
  };

  return (
    <nav style={navStyle}>
      <Link to={'/'} style={linkStyle}>Home</Link>
      <Link to={'/todo'} style={linkStyle}>Todo</Link>
      <Link to={'/test'} style={linkStyle}>Test</Link>
    </nav>
  );
}