import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

import App from "./App";
import store from "./store";

import reportWebVitals from "./reportWebVitals";

import "./index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

// https://reactjsexample.com/ react 案例网站搜索 cra-template 会有 create-react-app 的各种模版
// https://awesome-web-react.js.org/ 入门方向网站
// https://dev.to/surajondev/awesome-github-repositories-for-react-4cnn 超棒的react集合

root.render(
  <>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
