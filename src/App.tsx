import { TodoContainer } from "@/components/todo";

import { ReconciliationTest } from "@/components/reconciliation-test";



export const App = () => {
  return (
    <div>
      <div>{false}</div>
      <div>{null}</div>
      <div>{undefined}</div>
      <div>{0}</div>
      <ReconciliationTest/>
      <TodoContainer />
    </div>
  );
};
