import { Link, Outlet } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <div>
        <h1>Pages</h1>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          {/* <li>
            <Link to="/carousel/resize-observer">캐러셀 - ResizeObserver</Link>
          </li>
          <li>
            <Link to="/carousel/window-resize">캐러셀 - Window Resize</Link>
          </li> */}
          <li>
            <Link to="/grid/resize-observer-native-single-observer">
              그리드 - ResizeObserver (Native + Single Observer)
            </Link>
          </li>
          <li>
            <Link to="/grid/resize-observer-polyfill-single-observer">
              그리드 - ResizeObserver (Polyfill + Single Observer)
            </Link>
          </li>
          <li>
            <Link to="/grid/window-resize">그리드 - Window Resize</Link>
          </li>
        </ul>
      </div>
      <hr />
      <Outlet />
    </div>
  );
};
