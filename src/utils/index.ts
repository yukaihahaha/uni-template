import pagesConfig from '@/pages.json';

const { pages, subPackages, tabBar = { list: [] } } = { ...pagesConfig };

// 获取当前路由信息
export const getLastPage = () => {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
};

export const tabBarList = tabBar?.list || [];

/**
 * 判断页面是否是 tabbar 页
 * @param path 可选，页面路径。不传则判断当前页面
 * @returns 是否是 tabbar 页
 */
export const isTabbar = (path?: string): boolean => {
  if (!tabBar?.list?.length) return false;

  const targetPath = path
    ? path.startsWith('/')
      ? path.substring(1)
      : path
    : getLastPage()?.route;

  return tabBar.list.some((item) => item.pagePath === targetPath);
};

/**
 * 获取当前页面路由的 path 路径和 redirectPath 路径
 * path 如 '/pages/login/index'
 * redirectPath 如 '/pages/demo/base/route-interceptor'
 */
export const currRoute = () => {
  const lastPage = getLastPage();
  const currRoute = (lastPage as any).$page;
  const { fullPath } = currRoute as { fullPath: string };
  return getUrlObj(fullPath);
};

/**
 * 安全解码URL参数，支持多层编码，避免递归栈溢出
 * @param str 需要解码的字符串
 * @param maxDecodeTimes 最大解码次数（默认5次，平衡性能与兼容性）
 * @returns 解码后的字符串
 */
export const safeDecodeURIComponent = (
  str: string,
  maxDecodeTimes = 5,
): string => {
  // 参数校验
  if (!str || typeof str !== 'string') return '';
  let decoded = str;
  // 循环解码直至无变化或达到最大次数
  for (let i = 0; i < maxDecodeTimes; i++) {
    const previous = decoded;
    try {
      // 尝试解码
      decoded = decodeURIComponent(decoded);
      // 若解码结果无变化，说明已完成解码
      if (decoded === previous) {
        break;
      }
    } catch {
      // 解码失败时返回原始值或上次解码结果
      return previous;
    }
  }
  return decoded;
};

/**
 * 解析URL，提取路径和查询参数
 * @param url 要解析的URL字符串
 * @returns 包含path和query的对象
 * 比如输入url: /pages/login/index?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor
 * 输出: {path: /pages/login/index, query: {redirect: /pages/demo/base/route-interceptor}}
 */
export const getUrlObj = (
  url: string,
): { path: string; query: Record<string, string> } => {
  // 参数校验
  if (!url || typeof url !== 'string') {
    return { path: '', query: {} };
  }
  // 分离路径和查询字符串
  const [path, queryStr] = url.split('?');
  // 如果没有查询字符串，直接返回
  if (!queryStr) {
    return { path, query: {} };
  }
  // 处理可能的hash值
  const queryPart = queryStr.split('#')[0];
  // 解析查询参数
  const query: Record<string, string> = {};
  // 空查询字符串处理
  if (!queryPart) {
    return { path, query };
  }
  // 处理每个参数
  queryPart.split('&').forEach((param) => {
    // 跳过空参数
    if (!param) return;
    // 处理只有键没有值的情况
    if (!param.includes('=')) {
      query[safeDecodeURIComponent(param)] = '';
      return;
    }
    // 分离键值对（处理值中可能包含的等号）
    const [key, ...values] = param.split('=');
    const value = values.join('=');
    // 解码键和值
    const decodedKey = safeDecodeURIComponent(key);
    const decodedValue = safeDecodeURIComponent(value);
    // 忽略空键
    if (decodedKey) {
      query[decodedKey] = decodedValue;
    }
  });
  return { path, query };
};
/**
 * 得到所有的需要登录的 pages，包括主包和分包的
 * 这里设计得通用一点，可以传递 key 作为判断依据，默认是 needLogin, 与 route-block 配对使用
 * 如果没有传 key，则表示所有的 pages，如果传递了 key, 则表示通过 key 过滤
 */
export const getAllPages = (key: string) => {
  // 这里处理主包
  const mainPages = [
    ...pages
      .filter((page) => !key || (page as Record<string, any>)[key])
      .map((page) => ({
        ...page,
        path: `/${page.path}`,
      })),
  ];
  // 这里处理分包
  const subPages: any[] = [];
  subPackages.forEach((subPageObj) => {
    const { root } = subPageObj;

    subPageObj.pages
      .filter((page) => !key || (page as Record<string, any>)[key])
      .forEach((page: { path: string } & Record<string, any>) => {
        subPages.push({
          ...page,
          path: `/${root}/${page.path}`,
        });
      });
  });
  const result = [...mainPages, ...subPages];
  // console.log(`getAllPages by ${key} result: `, result)
  return result;
};

/**
 * 得到所有的需要登录的 pages，包括主包和分包的
 * 只得到 path 数组
 */
export const getNeedLoginPages = (): string[] =>
  getAllPages('needLogin').map((page) => page.path);

/**
 * 得到所有的需要登录的 pages，包括主包和分包的
 * 只得到 path 数组
 */
export const needLoginPages: string[] = getAllPages('needLogin').map(
  (page) => page.path,
);

//    此下两个方法是为了做所有页面都登录的情况下替换上方两个
// export const getNeedLoginPages = (): string[] =>
//   getAllPages("")
//     .map((page) => page.path)
//     .filter((path) => path !== "/pages/login/index"); // 添加 .filter() 排除登录页
// export const needLoginPages: string[] = getAllPages("")
//   .map((page) => page.path)
//   .filter((path) => path !== "/pages/login/index"); // 添加 .filter() 排除登录页
