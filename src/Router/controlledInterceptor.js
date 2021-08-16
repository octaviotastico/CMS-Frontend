import { useMemo, useState } from "react";

import { useInterceptor } from "./interceptor";

import { navigate } from "./router";

export const useControlledInterceptor = () => {
  const [interceptedPath, setInterceptedPath] = useState(null);

  const interceptorFunction = useMemo(
    () => (currentPath, nextPath) => {
      setInterceptedPath(nextPath);
      return currentPath;
    },
    [setInterceptedPath]
  );

  const stopInterception = useInterceptor(interceptorFunction);

  const confirmNavigation = useMemo(
    () => () => {
      stopInterception();
      navigate(interceptedPath);
    },
    [stopInterception, interceptedPath]
  );

  const resetPath = useMemo(() => () => setInterceptedPath(null), [
    setInterceptedPath,
  ]);

  return [interceptedPath, confirmNavigation, resetPath, stopInterception];
};
