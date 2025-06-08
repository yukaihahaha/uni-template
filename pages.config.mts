import { defineUniPages } from "@uni-helper/vite-plugin-uni-pages";
import { name } from "./package.json";
export default defineUniPages({
  globalStyle: {
    navigationStyle: "default",
    navigationBarTitleText: name,
    navigationBarBackgroundColor: "#f8f8f8",
    navigationBarTextStyle: "black",
    backgroundColor: "#FFFFFF",
    h5: {
      navigationStyle: "custom",
    },
  },
  easycom: {
    autoscan: true,
    custom: {
      "^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)":
        "z-paging/components/z-paging$1/z-paging$1.vue",
    },
  },
  tabBar: {
    color: "#999999",
    selectedColor: "#018d71",
    backgroundColor: "#F8F8F8",
    borderStyle: "black",
    height: "50px",
    fontSize: "10px",
    iconWidth: "24px",
    spacing: "3px",
    list: [
      {
        iconPath: "/static/tabbar/home_default.png",
        selectedIconPath: "/static/tabbar/home_active.png",
        pagePath: "pages/index/index",
        text: "Home",
      },
      {
        iconPath: "/static/tabbar/my_default.png",
        selectedIconPath: "/static/tabbar/my_active.png",
        pagePath: "pages/my/index",
        text: "My",
      },
    ],
  },
});
