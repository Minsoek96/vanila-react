# vanila-react
이 프로젝트는 바닐라 자바스크립트의 개념들을 활용하여 React의 핵심 기능을 구성한 프로젝트입니다.
vite와 typeScript를 활용하여 개발 되었습니다. jsx의 트랜스파일은 babel을 활용하여 변환을 처리하여 사용됩니다.

###
**stack** : typescript, vite,   
**ci/cd** : aws s3, gitAction


### 스크립트
|스크립트|설명|
|---|---|
|`npm i`|의존성 설치|
|`npm run dev`|개발 환경 가동|
|`npm run build`|빌드|

### 프로젝트 구조 

```
📦src
 ┣ 📂components
 ┣ 📂libs
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜batchUpdate.ts
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂jsx
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┗ 📜jsx-runtime.ts
 ┃ ┣ 📂react-dom
 ┃ ┃ ┣ 📜client.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜renderVnode.ts
 ┃ ┃ ┣ 📜syntheticEvent.ts
 ┃ ┃ ┗ 📜updateRender.ts
 ┃ ┣ 📂router
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂types
 ┃ ┃ ┗ 📜index.ts
 ┣ 📂style
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜stylemixin.ts
 ┃ ┗ 📜styles.ts
 ┣ 📂utils
 ┃ ┣ 📜debounce.ts
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜key.ts
 ┃ ┣ 📜transform.ts
 ┃ ┗ 📜validators.ts
 ┣ 📜App.tsx
 ┣ 📜main.tsx
 ┣ 📜routes.tsx
```


**main.tsx** : rootContainer를 관리하고, 라우트 변화를 감지합니다.
**libs**
: React의 핵심 기능을 구현한 모듈들이 포함되어 있습니다.

**react-dom (VDOM과 밀접한 관련)**
- client.ts: VDOM 렌더링의 전체 흐름을 제어합니다.
- renderVNode.ts: 최초 VDOM 렌더링을 담당합니다.
- updateRender.ts: VDOM 변화를 감지하고 렌더링을 적용합니다.
- syntheticEvent.ts: 이벤트를 변환하고 루트에 등록합니다.

**hooks (React 훅 관련)**
- batchUpdate.ts: 상태 업데이트를 일괄적으로 처리합니다.
  
**router (SPA 라우팅 관련)**
- SPA(Single Page Application) 라우팅의 기본 동작을 구현합니다.
  
**style (재사용 스타일 모음)** : 스타일 믹스인 및 재사용 가능한 스타일을 관리합니다.  

### 전체 동작 흐름
vanila-react의 렌더링 및 업데이트 흐름은 다음과 같습니다

1. main
   - RootContainer를 등록하고, 현재 라우팅 경로에 해당하는 컴포넌트를 렌더합니다.
2. client
   - main에서 전달된 RootContiner와 Component를 루트 스토어에 저장합니다.
   - RootContainer를 초기화한 후 컴포넌트를 호출합니다.
3. babel
   - 호출된 컴포넌트의 트리를 순회하며 JSX를 VDOM으로 변환합니다.
4. renderVnode
   - babel을 통해 변환된 VDOM의 결과를 순회하며 속성(이벤트, 스타일등)을 등록합니다.
5. syntheticEvent
   - 이벤트 타입을 매칭하고 변환후 루트에 등록합니다.
6. renderVnode에서 생성된 결과를 RootContainer에 append 합니다.
7. 현재의 결과를 루트스토어의 oldNode에 등록합니다.
8. 상태가 변경되면 this.update()를 호출합니다.
9. 루트 스토어에 등록된 rootComponent()를 호출합니다.
10. 최신화된 VDOM 상태를 루트스토어 newNode에 등록합니다.
12. updateRender를 통해 oldNode와 newNode를 비교(diff) 합니다.
13. 변환된 Vdom의 일부를 현재의 DOM에 반영하여 업데이트 처리합니다.
 
