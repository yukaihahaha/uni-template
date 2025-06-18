import { useUserStore } from "@/store";
import { getUrlObj, needLoginPages } from "@/utils";

export const authMixin = {
  onLoad() {
    const userStore = useUserStore();
    const token = userStore.token || "";
    // 获取当前页面的完整路径
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const currentRoute = (currentPage as any).$page.fullPath;

    // 获取页面路径，去除查询参数
    const { "path": targetPath } = getUrlObj(currentRoute);

    // 判断当前页面是否在需要登录的页面列表中 (由于之前我们已经将所有页面都加入needLoginPages，这里会判断为true)
    const isLoginPage = needLoginPages.includes(targetPath);

    if (isLoginPage && !token) {
      // 如果当前页面需要登录且用户未登录
      const redirectUrl = encodeURIComponent(currentRoute); // 编码当前页路径作为重定向参数
      const loginPageUrl = `/pages/login/index?redirect=${redirectUrl}`;
      uni.reLaunch({ "url": loginPageUrl });
    }
  },
};
