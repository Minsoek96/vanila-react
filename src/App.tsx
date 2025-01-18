import { Header, Content } from "./components";

export const App = () => {
  return (
    <>
      <Header />
      <Content />
      <div>
        <div>
          수식: {1*2} + {1+2}
          <div>depth</div>
        </div>
      </div>
    </>
  );
};
