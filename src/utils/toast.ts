/**
 * Toast
 */

// 定义 toast 函数可以接受的配置类型
type ToastOptions = Partial<Omit<UniApp.ShowToastOptions, "title">>;

/**
 * 显示消息提示。
 * @param title 消息标题
 * @param options 其他配置
 */
function toast(title: string, options?: ToastOptions): void {
  if (!title) return;

  uni.showToast({
    title,
    icon: "none",
    duration: 1500,
    ...options,
  });
}

/**
 * 显示一个加载中的提示
 * @param title 加载时显示的文本，默认为 '加载中...'
 * @returns 返回一个 hide 函数，用于手动关闭加载提示
 */
toast.loading = (title = "加载中..."): (() => void) => {
  uni.showLoading({
    title,
    mask: true,
  });

  // 返回一个函数，调用它即可关闭 loading
  return () => uni.hideLoading();
};

export default toast;
