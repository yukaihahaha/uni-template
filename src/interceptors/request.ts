// utils/interceptor.ts
import { useUserStore } from "@/store";
import { platform } from "@/utils/platform";
// 拦截器配置
const httpInterceptor = {
  invoke(options: UniApp.RequestOptions | UniApp.UploadFileOption) {

    const userStore = useUserStore();

    options.header = {
      Authorization: userStore.token ? `Bearer ${userStore.token || ""}` : "",
      platform, // 所在平台信息
      ...options.header,
    };

  },

  fail(err: any) {
    console.warn("请求被拦截或配置失败:", err);
  },
};

// 拦截器安装方法
export const requestInterceptor = {
  install() {
    // 请求拦截器（request、uploadFile）
    uni.addInterceptor("request", httpInterceptor);
    uni.addInterceptor("uploadFile", httpInterceptor);
  },
};
