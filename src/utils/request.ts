// utils/request.ts
interface RequestOptions<T = any> {
  url: string;
  method?: UniApp.RequestOptions["method"];
  data?: T;
  header?: Record<string, string>;
  timeout?: number;
  showLoading?: boolean;
  loadingTitle?: string;
}

interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

let isLoading = false;
const BASE_URL = import.meta.env.VITE_SERVER_BASEURL || "";

const request = <T = any>(options: RequestOptions): Promise<ApiResponse<T>> => {
  const {
    url,
    method = "GET",
    data,
    timeout = 10000,
    header = {},
    showLoading = true,
    loadingTitle = "加载中...",
  } = options;

  // 显示全局 Loading
  if (showLoading && !isLoading) {
    uni.showLoading({ title: loadingTitle, mask: true });
    isLoading = true;
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      method,
      data,
      timeout,
      header: {
        "Content-Type": "application/json",
        ...header,
      },
      success: (res) => {
        closeLoading(showLoading);

        const { statusCode, data: rawData } = res;
        const result = rawData as ApiResponse<T>;

        if (statusCode === 200) {
          if (result.code === 0) {
            resolve(result);
          } else {
            showError(result.message || "业务异常");
            reject(result);
          }
        } else if (statusCode === 401) {
          showError("登录已过期，请重新登录");
          // 这里你可以加跳转逻辑，如 uni.redirectTo({...})
          reject(new Error("401 Unauthorized"));
        } else {
          showError(`服务器错误 (${statusCode})`);
          reject(new Error(`HTTP ${statusCode}`));
        }
      },
      fail: (err) => {
        closeLoading(showLoading);
        showError("网络异常，请稍后重试");
        reject(err);
      },
    });
  });
};

// 关闭全局 Loading
function closeLoading(shouldClose: boolean) {
  if (shouldClose && isLoading) {
    uni.hideLoading();
    isLoading = false;
  }
}

// 统一错误提示
function showError(msg: string) {
  uni.showToast({ title: msg, icon: "none", duration: 2000 });
}

export default request;
