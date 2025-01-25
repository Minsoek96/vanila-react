import { TodoContainer } from "@/components/todo";
import { Header, Content } from "./components";
import RenderTest from "@/components/RenderTest";

export const App = () => {
  return (
    <>
      <RenderTest />
      <Header />
      <Content />
      <TodoContainer />
    </>
  );
};
