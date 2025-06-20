import { createSSRApp } from "vue";
import App from "./App.vue";
import "virtual:uno.css";
import "@/style/index.scss";
import store from "./store";
import {
  prototypeInterceptor,
  requestInterceptor,
  routeInterceptor,
} from "./interceptors";

// import { authMixin } from "./mixins/authMixin";   // app.mixin(authMixin);  所有页面都需要登录的情况下使用
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
