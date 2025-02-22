import { useRouter } from "@/libs/router";

export const App = () => {
  const router = useRouter();
  const handleReplace = (to: string) => {
    router.replace(to);
  };

  const handlePush = (to: string) => {
    router.push(to);
  };
  return (
    <div>
      <div>{false}</div>
      <div>{null}</div>
      <div>{undefined}</div>
      <div>{0}</div>
      <div>{router.pathname}</div>
      <button onClick={() => handleReplace("todo")}>Todo 페이지 이동</button>
      <button onClick={() => handlePush("test")}>Test 페이지 이동</button>
      <div>뒤로가기 방지 Test 이동</div>
      {"Vanilla React Test"}
    </div>
  );
};
