import { PropsWithChildren } from "@/libs/types";

const Router = {
  navigate(to: string) {
    window.history.pushState({}, "", `/${to}`);
  },
};

type LinkProps = {
  to: string;
};

/**
 * SPA 라우팅 방식의 링크
 * @param to - path 경로
 */
function Link({  children,to, ...props }: PropsWithChildren<LinkProps>) {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', to);
    //경로 변경을 전파
    window.dispatchEvent(new CustomEvent('routechange'));
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export {
  Router, Link
}