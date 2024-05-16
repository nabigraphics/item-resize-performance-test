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
import { GridResizeObserverNativePage } from "./pages/grid/ResizeObserverNative";
import { CarouselResizeObserverPage } from "./pages/carousel/ResizeObserver";
import { CarouselWindowResizePage } from "./pages/carousel/WindowResize";
import { GridWindowResizePage } from "./pages/grid/WindowResize";
import { GridResizeObserverPolyfillPage } from "./pages/grid/ResizeObserverPolyfill";

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
        path="grid/resize-observer-native"
        element={<GridResizeObserverNativePage />}
      />
      <Route
        path="grid/resize-observer-polyfill"
        element={<GridResizeObserverPolyfillPage />}
      />
      <Route path="grid/window-resize" element={<GridWindowResizePage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
