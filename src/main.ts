import { createSSRApp } from "vue";
import App from "./App.vue";
// import "uno.css";
import "virtual:uno.css";
import store from "./store";
export function createApp() {
  const app = createSSRApp(App);

  app.use(store);

  // 这里可以添加其他插件或全局配置

  return {
    app,
  };
}
