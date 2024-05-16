import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./styles/global.css";

import { App } from "./App";
import { GridResizeObserverNativeSingleObserverPage } from "./pages/grid/ResizeObserverNativeSingleObserver";
import { CarouselResizeObserverPage } from "./pages/carousel/ResizeObserver";
import { CarouselWindowResizePage } from "./pages/carousel/WindowResize";
import { GridWindowResizePage } from "./pages/grid/WindowResize";
import { GridResizeObserverPolyfillPage } from "./pages/grid/ResizeObserverPolyfillSingleObserver";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="carousel/resize-observer"
        element={<CarouselResizeObserverPage />}
      />
      <Route
        path="carousel/window-resize"
        element={<CarouselWindowResizePage />}
      />
      <Route
        path="grid/resize-observer-native-single-observer"
        element={<GridResizeObserverNativeSingleObserverPage />}
      />
      {/* <Route
        path="grid/resize-observer-native-multiple-observers"
        element={<GridResizeObserverNativeSingleObserverPage />}
      /> */}
      <Route
        path="grid/resize-observer-polyfill-single-observer"
        element={<GridResizeObserverPolyfillPage />}
      />
      {/* <Route
        path="grid/resize-observer-polyfill-multiple-observers"
        element={<GridResizeObserverPolyfillPage />}
      /> */}
      <Route path="grid/window-resize" element={<GridWindowResizePage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
