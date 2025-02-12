export const Router = {
  navigate(to: string) {
    window.history.pushState({}, "", `/${to}`);
  },
};