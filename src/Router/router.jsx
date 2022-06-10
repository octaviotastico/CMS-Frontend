/* eslint-disable react/display-name */
/* eslint-disable no-undef */
/* eslint-disable no-continue */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-rest-params */
/* eslint-disable global-require */
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useDebugValue,
  isValidElement,
} from "react";
import isNode from "./isNode";
import { interceptRoute } from "./interceptor";
import { setQueryParams } from "./queryParams";

const preparedRoutes = {};
const stack = {};
let componentId = 1;
let currentPath = isNode() ? "" : window.location.pathname;
let basePath = "";
let basePathRegEx = null;
const pathUpdaters = [];

export const setBasepath = (inBasepath) => {
  basePath = inBasepath;
  basePathRegEx = new RegExp(`^${basePath}`);
};

export const getBasepath = () => basePath;

const resolvePath = (inPath) => {
  if (isNode()) {
    const url = require("url");
    return url.resolve(currentPath, inPath);
  }

  const current = new URL(currentPath, window.location.href);
  const resolved = new URL(inPath, current);
  return resolved.pathname;
};

export const ParentContext = createContext(null);

const prepareRoute = (inRoute) => {
  if (preparedRoutes[inRoute]) {
    return preparedRoutes[inRoute];
  }

  const preparedRoute = [
    new RegExp(
      `${inRoute.substr(0, 1) === "*" ? "" : "^"}${inRoute
        .replace(/:[a-zA-Z]+/g, "([^/]+)")
        .replace(/\*/g, "")}${inRoute.substr(-1) === "*" ? "" : "$"}`,
    ),
  ];

  const propList = inRoute.match(/:[a-zA-Z]+/g);
  preparedRoute.push(propList ? propList.map((paramName) => paramName.substr(1)) : []);

  preparedRoutes[inRoute] = preparedRoute;
  return preparedRoute;
};

let customPath = "/";

export const setPath = (inPath) => {
  const url = require("url");
  customPath = url.resolve(customPath, inPath);
};

export const getPath = () => customPath;

export const usePath = (active = true, withBasepath = false) => {
  const [, setUpdate] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }

    pathUpdaters.push(setUpdate);
    return () => {
      const index = pathUpdaters.indexOf(setUpdate);
      if (index !== -1) {
        pathUpdaters.splice(index, 1);
      }
    };
  }, [setUpdate, active]);

  return withBasepath ? currentPath : currentPath.replace(basePathRegEx, "");
};

const updatePathHooks = () => {
  const now = Date.now();
  pathUpdaters.forEach((cb) => cb(now));
};

export const getWorkingPath = (parentRouterId) => {
  if (!parentRouterId) {
    return isNode() ? customPath : window.location.pathname.replace(basePathRegEx, "") || "/";
  }
  const stackEntry = stack[parentRouterId];
  if (!stackEntry) {
    throw new Error("what?");
  }

  return stackEntry.reducedPath !== null ? stackEntry.reducedPath || "/" : window.location.pathname;
};

const processStack = () => Object.values(stack).forEach(process);

const objectsEqual = (objA, objB) => {
  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);

  const valueIsEqual = (key) => objB.hasOwnProperty(key) && objA[key] === objB[key];

  return objAKeys.length === objBKeys.length && objAKeys.every(valueIsEqual);
};

if (!isNode()) {
  window.addEventListener("popstate", (e) => {
    const nextPath = interceptRoute(currentPath, window.location.pathname);

    if (!nextPath || nextPath === currentPath) {
      e.preventDefault();
      e.stopPropagation();
      window.history.pushState(null, null, currentPath);
      return;
    }

    currentPath = nextPath;

    if (nextPath !== window.location.pathname) {
      window.history.replaceState(null, null, nextPath);
    }
    processStack();
    updatePathHooks();
  });
}

export const navigate = (url, replace = false, queryParams = null, replaceQueryParams = true) => {
  url = interceptRoute(currentPath, resolvePath(url));

  if (!url || url === currentPath) {
    return;
  }

  currentPath = url;

  if (isNode()) {
    setPath(url);
    processStack();
    updatePathHooks();
    return;
  }

  let finalURL = url;
  if (basePathRegEx && !url.match(basePathRegEx)) {
    finalURL = `${basePath}${url}`;
  }

  window.history[`${replace ? "replace" : "push"}State`](null, null, finalURL);

  processStack();
  updatePathHooks();

  if (queryParams) {
    setQueryParams(queryParams, replaceQueryParams);
  }
};

const emptyFunc = () => null;

const process = (stackObj, directCall) => {
  const {
    routerId,
    parentRouterId,
    routes,
    setUpdate,
    resultFunc,
    resultProps,
    reducedPath: previousReducedPath,
  } = stackObj;

  const currPath = getWorkingPath(parentRouterId);
  let route = null;
  let targetFunction = null;
  let targetProps = null;
  let reducedPath = null;
  let anyMatched = false;

  for (let i = 0; i < routes.length; i++) {
    [route, targetFunction] = routes[i];
    const [regex, groupNames] = preparedRoutes[route] ? preparedRoutes[route] : prepareRoute(route);

    const result = currPath.match(regex);
    if (!result) {
      targetFunction = emptyFunc;
      continue;
    }

    if (groupNames.length) {
      targetProps = {};
      for (let j = 0; j < groupNames.length; j++) {
        targetProps[groupNames[j]] = result[j + 1];
      }
    }

    reducedPath = currPath.replace(result[0], "");
    anyMatched = true;
    break;
  }

  if (!stack[routerId]) {
    return;
  }

  if (!anyMatched) {
    route = null;
    targetFunction = null;
    targetProps = null;
    reducedPath = null;
  }

  const funcsDiffer = resultFunc !== targetFunction;
  const pathDiffer = reducedPath !== previousReducedPath;
  let propsDiffer = true;

  if (!funcsDiffer) {
    if (!resultProps && !targetProps) {
      propsDiffer = false;
    } else {
      propsDiffer = !(
        resultProps &&
        targetProps &&
        objectsEqual(resultProps, targetProps) === true
      );
    }

    if (!propsDiffer) {
      if (!pathDiffer) {
        return;
      }
    }
  }

  let result = null;

  if ((funcsDiffer || propsDiffer) && targetFunction) {
    result = targetFunction(targetProps);
  } else if (!(funcsDiffer || propsDiffer)) {
    result = stackObj.result;
  }

  Object.assign(stack[routerId], {
    result,
    reducedPath,
    matchedRoute: route,
    passContext: route ? route.substr(-1) === "*" : false,
  });

  if (directCall && (funcsDiffer || propsDiffer || route === null)) {
    setUpdate(Date.now());
  }
};

const wrapperFunction = (RouteContext, originalResult) => () =>
  <RouteContext>{originalResult.apply(originalResult, arguments)}</RouteContext>;

export const useRoutes = (routeObj) => {
  // Each router gets an internal id to look them up again.
  const [routerId] = useState(componentId);
  const setUpdate = useState(0)[1];
  // Needed to create nested routers which use only a subset of the URL.
  const parentRouterId = useContext(ParentContext);

  // If we just took the last ID, increase it for the next hook.
  if (routerId === componentId) {
    componentId += 1;
  }

  // Removes the router from the stack after component unmount - it won't be processed anymore.
  useEffect(() => () => delete stack[routerId], [routerId]);

  let stackObj = stack[routerId];

  if (stackObj && stackObj.originalRouteObj !== routeObj) {
    stackObj = null;
  }

  if (!stackObj) {
    stackObj = {
      routerId,
      originalRouteObj: routeObj,
      routes: Object.entries(routeObj),
      setUpdate,
      parentRouterId,
      matchedRoute: null,
      reducedPath: null,
      passContext: false,
      result: null,
    };

    stack[routerId] = stackObj;

    process(stackObj, true);
  }

  useDebugValue(stackObj.matchedRoute);

  if (!stackObj.matchedRoute) {
    return null;
  }

  const { result } = stackObj;

  if (!stackObj.passContext) {
    return result;
  }
  const RouteContext = ({ children }) => (
    <ParentContext.Provider value={routerId}>{children}</ParentContext.Provider>
  );

  if (typeof result === "function") {
    return wrapperFunction(RouteContext, result);
  }

  return isValidElement(result) && result.type !== RouteContext ? (
    <RouteContext>{result}</RouteContext>
  ) : (
    result
  );
};
