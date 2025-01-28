// import { TodoContainer } from "@/components/todo";
// import RenderTestTwo from "@/components/RenderTestTwo";

import { Header, Content, RenderTest } from "./components";



//TODO : 단일 자식의 경우 약간의 문제 있음
// 수정 요망
export const App = () => {
  return (
    <div>
      {null}
      <div>{false}</div>
      <div>{null}</div>
      <div>{undefined}</div>
      <div>{0}</div>
      <RenderTest />
      {/* <RenderTestTwo/>
      <Header />
      <Content />
      <TodoContainer /> */}
    </div>
  );
};
