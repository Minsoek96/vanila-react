import { TodoContainer } from "@/components/todo";

import { Header, Counter, RenderTestInput, RenderTestList } from "./components";
import EffectTest from "@/components/EffectTest";



//TODO : 단일 자식의 경우 약간의 문제 있음
// 수정 요망
export const App = () => {
  return (
    <div>
      <div>{false}</div>
      <div>{null}</div>
      <div>{undefined}</div>
      <div>{0}</div>
      <RenderTestInput />
      <RenderTestList/>
      <Header />
      <Counter />
      <EffectTest/>
      <TodoContainer />
    </div>
  );
};
