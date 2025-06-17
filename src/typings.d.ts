// 全局要用的类型放到这里

declare global {
  type ApiResponse<T> = {
    code: number;
    message: string;
    data: T;
  };
}

export {}; // 防止模块污染
