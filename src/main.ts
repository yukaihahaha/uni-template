import { createSSRApp } from "vue";
import App from "./App.vue";
// import "uno.css";
import "virtual:uno.css";
import "@/style/index.scss";
import store from "./store";
import {
  prototypeInterceptor,
  requestInterceptor,
  routeInterceptor,
} from "./interceptors";

export function createApp() {
  const app = createSSRApp(App);

  app.use(store);
  app.use(routeInterceptor);
  app.use(requestInterceptor);
  app.use(prototypeInterceptor);
  // 这里可以添加其他插件或全局配置

  return {
    app,
  };
}
