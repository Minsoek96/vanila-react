import { PropsWithChildren } from "@/libs/types";

type RouterType = {
  push: (to:string) => void;
  replace: (to:string) => void;
  forward: () => void;
  back: () => void;
  pathname: () => string;
}

/** 라우팅 관련 메서드들을 제공하는 커스텀 훅 */
const useRouter = ():RouterType => {
  const push = (to: string) => {
    window.history.pushState({}, "", `${to}`);
    window.dispatchEvent(new CustomEvent('routechange'));
  }

  const replace = (to:string) => {
    window.history.replaceState({}, "", `${to}`);
    window.dispatchEvent(new CustomEvent('routechange'));
  }  

  const forward = () => {
    window.history.forward();
  } 

  const back = () => {
    window.history.back();
  }

  const pathname = () => {
    return window.location.pathname;
  }

  return {
    push, replace, forward, back, pathname
  }
};

type LinkProps = {
  to: string;
};

/**
 * SPA 라우팅 방식의 링크
 * @param to - path 경로
 */
function Link({ children, to, ...props }: PropsWithChildren<LinkProps>) {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();

    if (window.location.pathname === to) {
      return;
    }
    
    window.history.pushState({}, "", to);
    //경로 변경을 전파
    window.dispatchEvent(new CustomEvent("routechange"));
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export { useRouter, Link };
