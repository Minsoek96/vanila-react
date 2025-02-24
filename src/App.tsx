import RouterTest from "@/components/reconciliation-test/RouterTest";

export const App = () => {
  return (
    <div>
      <div>{false}</div>
      <div>{null}</div>
      <div>{undefined}</div>
      <div>{0}</div>
      <RouterTest />
    </div>
  );
};
