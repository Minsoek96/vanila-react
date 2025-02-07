import { useState } from "@/libs/hooks";

/**
 * RenderTestList
 * 
 * 1. 모듈화되지 않은 리스트를 테스트
 * 2. 간단한 ADD, REMOVE 테스트
 */
export default function RenderTestList() {
  const [data, setData] = useState<string[]>([]);

  const addData = () => {
    const uid = new Date().getTime();
    const newData = `새로운아이템-${uid}`;
    setData(prev => [...prev, newData]);
  };

  const removeData = (target: string) => {
    setData(prev => prev.filter(item => item !== target));
  };

  return (
    <div>
      <p>{data.length}</p>
      <button onClick={addData}>클릭</button>
      <section>
        {data.length > 0 && data.map((item) => (
          <div key={item} onClick={() => removeData(item)}>
            새롭게 생겨난
            <p>{item}</p>
          </div>
        ))}
      </section>
    </div>
  );
}