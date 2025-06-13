/**
 * 通用类型判断工具集
 */

export const toString = Object.prototype.toString;

export const isArray = Array.isArray;

/**
 * 获取变量的原始类型名称（如：[object String] => "String"）
 * @param val 任意值
 * @returns 类型名称字符串，如 "String"、"Number"、"Object" 等
 */
export const getType = (val: unknown): string => toString.call(val).slice(8, -1);

/** ----------- 原始类型判断 ----------- */

/** 判断是否为字符串 */
export const isString = (val: unknown): val is string => typeof val === "string";

/** 判断是否为数字（排除 NaN） */
export const isNumber = (val: unknown): val is number =>
  typeof val === "number" && !isNaN(val);

/** 判断是否为布尔值 */
export const isBoolean = (val: unknown): val is boolean => typeof val === "boolean";

/** 判断是否为函数 */
export const isFunction = (val: unknown): val is Function => typeof val === "function";

/** ----------- 空值判断 ----------- */

/** 判断是否为 undefined */
export const isUndefined = (val: unknown): val is undefined => typeof val === "undefined";

/** 判断是否为 null */
export const isNull = (val: unknown): val is null => val === null;

/** 判断是否为 null 或 undefined */
export const isNil = (val: unknown): val is null | undefined => val == null;

/** ----------- 引用类型判断 ----------- */

/**
 * 判断是否为一般对象（非 null，且不是数组）
 * 包括 Date、Map、Set 等
 */
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === "object" && !isArray(val);

/**
 * 判断是否为纯对象（由 {} 或 new Object() 创建的对象）
 * 会排除数组、null、自定义类实例、无原型对象等
 * @param val 任意值
 * @returns 是否为纯对象
 */
export const isPlainObject = (val: unknown): val is Record<string, any> => {
  if (getType(val) !== "Object") return false;

  // 额外排除无原型对象（Object.create(null)）
  if (Object.getPrototypeOf(val) === null) return false;

  return true;
};

/** 判断是否为合法的日期对象（非 Invalid Date） */
export const isDate = (val: unknown): val is Date =>
  val instanceof Date && !isNaN(val.getTime());

/** 判断是否为正则表达式 */
export const isRegExp = (val: unknown): val is RegExp => val instanceof RegExp;

/** 判断是否为 Promise 对象（具有 then 和 catch 方法） */
export const isPromise = <T = any>(val: unknown): val is Promise<T> =>
  isObject(val) &&
  isFunction((val as any).then) &&
  isFunction((val as any).catch);

/** 判断是否为 Map 对象 */
export const isMap = (val: unknown): val is Map<any, any> => getType(val) === "Map";

/** 判断是否为 Set 对象 */
export const isSet = (val: unknown): val is Set<any> => getType(val) === "Set";

/** ----------- 浏览器相关（仅 H5 有效） ----------- */

/** 判断是否为浏览器的 Window 对象 */
export const isWindow = (val: unknown): val is Window =>
  typeof window !== "undefined" && val === window;

/** 判断是否为浏览器中的 DOM 元素 */
export const isElement = (val: unknown): val is Element =>
  typeof Element !== "undefined" && val instanceof Element;

/** ----------- 通用判断 ----------- */

/**
 * 判断值是否为空：
 * - null 或 undefined
 * - 空字符串（忽略空格）
 * - 空数组 []
 * - 空对象 {}
 * - 空 Map / Set
 * @param val 任意值
 * @returns 是否为空
 */
export const isEmpty = (val: unknown): boolean => {
  if (isNil(val)) return true;

  if (isString(val)) return val.trim().length === 0;

  if (isArray(val)) return val.length === 0;

  if (isMap(val) || isSet(val)) return val.size === 0;

  if (isPlainObject(val)) return Object.keys(val).length === 0;

  return false;
};

/**
 * 递归判断对象或数组中是否存在至少一个“非空值”
 * - 支持类型：数组、普通对象、Map、Set
 * - 其他类型直接判断是否非空
 * @param val 任意数据
 * @returns 是否存在至少一个非空值
 */
export const hasDeepValue = (val: unknown): boolean => {
  if (isArray(val)) {
    return val.some(hasDeepValue);
  }

  // 只调用一次 getType，避免重复
  const type = getType(val);

  if (type === "Object") {
    return Object.values(val as Record<string, unknown>).some(hasDeepValue);
  }

  if (type === "Map" || type === "Set") {
    return Array.from(val as Map<any, unknown> | Set<unknown>).some(hasDeepValue);
  }

  return !isEmpty(val);
};

/**
 * 判断是否为合法的 URL 地址
 * 支持协议：http、https、ftp、ws、wss
 * @param val 输入的字符串
 * @returns 是否为合法 URL
 */
export const isUrl = (val: unknown): boolean => {
  if (!isString(val)) return false;

  // 支持 http(s), ftp, ws(s) 协议，忽略末尾空白
  const pattern = /^(https?|ftp|ws|wss):\/\/[^\s/$.?#].[^\s]*$/i;

  return pattern.test(val.trim());
};
