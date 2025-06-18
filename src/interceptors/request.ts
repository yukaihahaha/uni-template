import qs from 'qs';
import { useUserStore } from '@/store';
import { platform } from '@/utils/platform';

// 防止重复的登录重定向
let isRedirectingToLogin = false;

const httpInterceptor = {
  invoke(
    options: (UniApp.RequestOptions | UniApp.UploadFileOption) & {
      query?: Record<string, any>;
    },
  ) {
    // 接口请求支持通过 query 参数配置 queryString
    if (options.query) {
      const queryStr = qs.stringify(options.query);
      if (options.url.includes('?')) {
        options.url += `&${queryStr}`;
      } else {
        options.url += `?${queryStr}`;
      }
    }

    const userStore = useUserStore();

    options.header = {
      Authorization: userStore.token ? `Bearer ${userStore.token || ''}` : '',
      platform, // 所在平台信息
      ...options.header,
    };
  },

  success(response: UniApp.RequestSuccessCallbackResult) {},

  fail(err: any) {
    console.warn('请求被拦截或配置失败:', err);
    // 这里通常处理网络错误，例如断网、请求超时等
    uni.showToast({
      title: '网络错误或请求失败',
      icon: 'none',
    });
  },

  complete(response: UniApp.RequestSuccessCallbackResult) {
    // 统一处理 HTTP 状态码
    const { statusCode } = response;
    // 401: 未授权 (通常是token过期或无效)
    // 403: 禁止访问 (权限不足)
    if ((statusCode === 401 || statusCode === 403) && !isRedirectingToLogin) {
      isRedirectingToLogin = true; // 设置标志，防止重复跳转

      uni.showToast({
        title: '登录已过期或无权限，请重新登录',
        icon: 'none',
        duration: 2000,
        success: () => {
          // 清除用户状态
          const userStore = useUserStore();
          userStore.removeUserInfo();

          // 重定向到登录页
          uni.reLaunch({
            url: '/pages/login/index',
            success: () => {
              isRedirectingToLogin = false; // 重置标志
            },
            fail: () => {
              isRedirectingToLogin = false; // 即使失败也要重置
            },
          });
        },
      });
    }
  },
};

// 拦截器安装方法
export const requestInterceptor = {
  install() {
    // 请求拦截器（request、uploadFile）
    uni.addInterceptor('request', httpInterceptor);
    uni.addInterceptor('uploadFile', httpInterceptor);
  },
};
