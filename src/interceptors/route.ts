import { useUserStore } from "@/store";
import { needLoginPages, getUrlObj } from "@/utils";

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

    // 获取页面路径，去除查询参数
    const { "path": targetPath } = getUrlObj(url as string);

    // 判断是否是需要登录的页面
    const isLoginPage = needLoginPages.includes(targetPath);

    if (isLoginPage && !token) {
      // 如果是需要登录的页面且用户未登录
      const redirectUrl = encodeURIComponent(url as string); // 编码原路径作为重定向参数
      const loginPageUrl = `/pages/login/index?redirect=${redirectUrl}`;
      uni.navigateTo({ "url": loginPageUrl });

      return false; // 阻止本次跳转
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
