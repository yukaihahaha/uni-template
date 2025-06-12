import { useUserStore } from "@/store";
import { needLoginPages, getNeedLoginPages } from "@/utils";

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

    const method = options as any;
    const isSwitchTab = method && method.openType === "switchTab";
    const requiresLogin = needLoginPages.some((path) =>
      isSwitchTab ? path === url : url.startsWith(path)
    );

    if (requiresLogin && !token) {
      if (!isRedirecting) {
        isRedirecting = true;
        uni.redirectTo({ url: "/pages/login/index" });
        isRedirecting = false;
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
