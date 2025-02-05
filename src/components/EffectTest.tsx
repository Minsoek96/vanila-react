import { useEffect, useState } from "@/libs/hooks";


function Toggle() {
  useEffect(() => {
    console.log("컴포넌트 생성");

    return () => {
      console.log("컴포넌트 종료");
    };
  }, []);

  return <div>토글 체크</div>;
}


export default function CleanupTestComponent() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "언마운트 하기" : "마운트 하기"}
      </button>
      {isVisible && <Toggle />}
    </div>
  );
}