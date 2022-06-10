import React from "react";
import isNode from "./isNode";

const queryParamListeners = [];
let queryParamObject = {};

const objectToQueryString = (inObj) => {
  const qs = new URLSearchParams();
  Object.entries(inObj).forEach(([key, value]) =>
    value !== undefined ? qs.append(key, value) : null,
  );
  return qs.toString();
};

export const setQueryParams = (inObj, replace = false) => {
  if (!(inObj instanceof Object)) {
    throw new Error("Object required");
  }
  if (replace) {
    queryParamObject = inObj;
  } else {
    Object.assign(queryParamObject, inObj);
  }
  const now = Date.now();
  queryParamListeners.forEach((cb) => cb(now));
  if (!isNode()) {
    const qs = `?${objectToQueryString(queryParamObject)}`;
    if (qs === window.location.search) {
      return;
    }
    window.history.replaceState(null, null, window.location.pathname + (qs !== "?" ? qs : ""));
  }
};

export const getQueryParams = () => ({ ...queryParamObject });

const queryStringToObject = (inStr) => {
  const p = new URLSearchParams(inStr);
  const result = {};
  for (const param of p) {
    const query = param[0];
    const value = param[1];
    result[query] = value;
  }
  return result;
};

if (!isNode()) {
  queryParamObject = queryStringToObject(window.location.search.substr(1));
}

export const useQueryParams = () => {
  const setUpdate = React.useState(0)[1];

  React.useEffect(() => {
    queryParamListeners.push(setUpdate);

    return () => {
      const index = queryParamListeners.indexOf(setUpdate);
      if (index === -1) {
        return;
      }
      queryParamListeners.splice(index, 1);
    };
  }, [setUpdate]);

  return [queryParamObject, setQueryParams];
};
