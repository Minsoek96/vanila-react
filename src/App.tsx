import { TodoContainer } from "@/components/todo";
import { Header, Content } from "./components";
import RenderTest from "@/components/RenderTest";
import { useState } from "@/libs/hooks";

//TODO : 단일 자식의 경우 약간의 문제 있음
// 수정 요망
export const App = () => {
  return (
    <div>
      {/* <div>dsa</div> */}
      <RenderTest />
      {/* <Header />
      <Content />
      <TodoContainer /> */}
    </div>
  );
};
