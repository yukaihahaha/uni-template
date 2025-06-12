import { useUserStore } from "@/store";
interface RequestOptions<T = any> {
  url: string;
  method?: UniApp.RequestOptions["method"];
  data?: T;
  header?: Record<string, string>;
  timeout?: number;
  showLoading?: boolean;
  loadingTitle?: string;
  retryCount?: number; // 重试次数，默认 0 不重试
  retryDelay?: number; // 重试间隔，默认 1000ms
}

interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

let loadingCount = 0;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const request = <T = any>(options: RequestOptions): Promise<ApiResponse<T>> => {
  const {
    url,
    method = "GET",
    data,
    timeout = 10000,
    header = {},
    showLoading = true,
    loadingTitle = "加载中...",
    retryCount = 0,
    retryDelay = 1000,
  } = options;

  if (showLoading) {
    if (loadingCount === 0) {
      uni.showLoading({ title: loadingTitle, mask: true });
    }
    loadingCount++;
  }
  const userStore = useUserStore();
  const attemptRequest = (retryLeft: number): Promise<ApiResponse<T>> => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: import.meta.env.VITE_SERVER_BASEURL + url,
        method,
        data,
        timeout,
        header: {
          "Content-Type": "application/json",
          ...header,
        },
        success: (res) => {
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
            userStore.removeUserInfo();
            uni.reLaunch({ url: "/pages/login/index" });

            reject(new Error("401 Unauthorized"));
          } else {
            showError(`服务器错误 (${statusCode})`);
            reject(new Error(`HTTP ${statusCode}`));
          }
        },
        fail: (err) => {
          // 网络异常才重试
          if (retryLeft > 0) {
            delay(retryDelay).then(() => {
              attemptRequest(retryLeft - 1)
                .then(resolve)
                .catch(reject);
            });
          } else {
            showError("网络异常，请稍后重试");
            reject(err);
          }
        },
        complete() {
          if (showLoading) {
            loadingCount = Math.max(loadingCount - 1, 0);
            if (loadingCount === 0) {
              uni.hideLoading();
            }
          }
        },
      });
    });
  };

  return attemptRequest(retryCount);
};

function showError(msg: string) {
  uni.showToast({ title: msg, icon: "none", duration: 2000 });
}

export default request;
