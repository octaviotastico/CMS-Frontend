import { useEffect } from "react";

import isNode from "./isNode";

let currentTitle;

export const useTitle = (inTitle) => {
  currentTitle = inTitle;

  useEffect(() => {
    if (isNode()) return;
    const previousTitle = document.title;
    document.title = inTitle;
    return () => (document.title = previousTitle);
  });
};

export const getTitle = () => currentTitle;
