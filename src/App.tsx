import { useState } from "@/libs/hooks";
import { Router } from "@/libs/router";

import { TodoContainer } from "@/components/todo";
import { ReconciliationTest } from "@/components/reconciliation-test";

export const App = () => {
  const [currentPage, setCurrentPage] = useState<"test" | "todo">("test");

  const handleToggle = () => {
    const nextPage = currentPage === "test" ? "todo" : "test";
    setCurrentPage(nextPage);
    Router.navigate(nextPage);
  };
 
  return (
    <div>
      <div>{false}</div>
      <div>{null}</div>
      <div>{undefined}</div>
      <div>{0}</div>
      <button onClick={handleToggle}>
        {currentPage === "test" ? "Todo 보기" : "Test 보기"}
      </button>
      {currentPage === "test" ? <TodoContainer /> : <ReconciliationTest /> }
    </div>
  );
};
