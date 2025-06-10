// utils/interceptor.ts
import { useUserStore } from "@/store";

// 拦截器配置
const httpInterceptor = {
 invoke(options: UniApp.RequestOptions | UniApp.UploadFileOption){
    const token = useUserStore().token;

    options.header = options.header || {};

    if (token) {
      options.header.Authorization = `Bearer ${token}`;
    }
  },

  fail(err: any) {
    console.warn("请求被拦截或配置失败:", err);
  }
};

// 拦截器安装方法
export const requestInterceptor = {
  install() {
    // 请求拦截器（request、uploadFile）
    uni.addInterceptor("request", httpInterceptor);
    uni.addInterceptor("uploadFile", httpInterceptor);
  }
};
