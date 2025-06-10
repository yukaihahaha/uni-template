import { useUserStore } from "@/store";

// 白名单：需要登录的页面（包括 tabBar 页面）
const whiteList = ["/pages/login/index"];

let isRedirecting = false;

type NavigateOptions =
  | UniApp.NavigateToOptions
  | UniApp.RedirectToOptions
  | UniApp.SwitchTabOptions
  | UniApp.ReLaunchOptions;

const navigateInterceptor = {
  invoke(options: NavigateOptions) {
    const userStore = useUserStore();
    const token = userStore.token || "";
    const url = "url" in options && options.url ? options.url : "";

    if (!url) return;

    // 根据跳转类型决定匹配方式
    const method = options as any;
    const isSwitchTab = method && method.openType === "switchTab";
    const requiresLogin = whiteList.some((path) =>
      isSwitchTab ? path === url : url.startsWith(path)
    );

    if (requiresLogin && !token) {
      if (!isRedirecting) {
        isRedirecting = true;
        uni.showToast({ title: "请先登录", icon: "none" });
        setTimeout(() => {
          uni.redirectTo({ url: "/pages/login/index" });
          isRedirecting = false;
        }, 1500);
      }
      return false;
    }
    // 放行跳转
  },
};

export const routeInterceptor = {
  install() {
    uni.addInterceptor("navigateTo", navigateInterceptor);
    uni.addInterceptor("redirectTo", navigateInterceptor);
    uni.addInterceptor("switchTab", navigateInterceptor);
    uni.addInterceptor("reLaunch", navigateInterceptor);
  },
};
