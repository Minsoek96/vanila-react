import { TodoContainer } from "@/components/todo";

import { Header, Content, RenderTest } from "./components";



//TODO : 단일 자식의 경우 약간의 문제 있음
// 수정 요망
export const App = () => {
  return (
    <div>
      <RenderTest />
      <Header />
      <Content />
      <TodoContainer />
    </div>
  );
};
