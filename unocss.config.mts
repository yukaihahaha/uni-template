import { presetUni } from "@uni-helper/unocss-preset-uni";
import {
  defineConfig,
  presetIcons, // 图标预设
  presetAttributify, // 属性模式预设
  transformerDirectives, // 指令转换器
  transformerVariantGroup, // 群组转换器
} from "unocss";

export default defineConfig({
  // 第一部分：预设配置 (presets)
  presets: [
    // uni-app 预设，提供 rpx 单位支持和 uni-app 特定样式
    presetUni(),

    // 图标预设配置
    presetIcons({
      scale: 1.2, // 图标缩放比例
      warn: true, // 是否在控制台显示警告
      extraProperties: {
        display: "inline-block", // 设置图标为行内块元素
        "vertical-align": "middle", // 垂直对齐方式
      },
    }),

    // 启用属性化模式，可以把类名转换为属性
    // 例如：class="flex" 可以写成 flex
    presetAttributify(),
  ],

  // 第二部分：转换器配置 (transformers)
  transformers: [
    // 支持在 CSS 中使用 @apply 指令
    // 例如：@apply flex items-center
    transformerDirectives(),

    // 支持群组语法
    // 例如：hover:(bg-blue-400 text-white)
    transformerVariantGroup(),
  ],

  // 第三部分：快捷方式配置 (shortcuts)
  shortcuts: [
    {
      // 居中布局
      "flex-center": "flex justify-center items-center",
      // 两端对齐
      "flex-between": "flex justify-between items-center",
      // 均匀分布
      "flex-around": "flex justify-around items-center",
      // 左对齐
      "flex-start": "flex justify-start items-center",
      // 右对齐
      "flex-end": "flex justify-end items-center",

      // 绝对定位居中
      "absolute-center":
        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      // 固定定位居中
      "fixed-center":
        "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",

      // 单行文本省略
      "text-overflow-1": "overflow-hidden whitespace-nowrap text-ellipsis",
      // 两行文本省略
      "text-overflow-2": "overflow-hidden text-ellipsis break-all line-clamp-2",
    
    },
  ],

  // 自定义规则 (rules)
  rules: [
    // === 安全区适配 ===
    // 四周安全区域padding
    [
      "p-safe",
      {
        padding:
          "env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)",
      },
    ],
    // 顶部安全区域padding
    ["pt-safe", { "padding-top": "env(safe-area-inset-top)" }],
    // 底部安全区域padding
    ["pb-safe", { "padding-bottom": "env(safe-area-inset-bottom)" }],

    // === rpx 单位支持 ===
    // 正方形尺寸，例如：rpx-100 => width: 100rpx; height: 100rpx
    [/^rpx-(\d+)$/, ([, d]) => ({ width: `${d}rpx`, height: `${d}rpx` })],
    // 宽度，例如：w-rpx-100 => width: 100rpx
    [/^w-rpx-(\d+)$/, ([, d]) => ({ width: `${d}rpx` })],
    // 高度，例如：h-rpx-100 => height: 100rpx
    [/^h-rpx-(\d+)$/, ([, d]) => ({ height: `${d}rpx` })],
    // 字体大小，例如：text-rpx-28 => font-size: 28rpx
    [/^text-rpx-(\d+)$/, ([, d]) => ({ "font-size": `${d}rpx` })],
  ],

  // 第五部分：主题配置 (theme)
  theme: {
    colors: {
      /** 主题色  用法如: text-primary */
      primary: "var(--wot-color-theme, #0957DE)", // 主要颜色
      // secondary: "var(--wot-color-secondary, #666)", // 次要颜色
      // success: "var(--wot-color-success, #07c160)", // 成功颜色
      // warning: "var(--wot-color-warning, #ff976a)", // 警告颜色
      // error: "var(--wot-color-error, #ee0a24)",     // 错误颜色
      // info: "var(--wot-color-info, #909399)",       // 信息颜色
    },
       /**  [字体大小, 行高]  用法如: text-3xs */
    fontSize: {
      "3xs": ["18rpx", "26rpx"], // 最小字号
      "2xs": ["20rpx", "28rpx"], // 次小字号
      xs: ["24rpx", "32rpx"], // 特小号
      sm: ["28rpx", "36rpx"], // 小号
      base: ["32rpx", "40rpx"], // 基础字号
      lg: ["36rpx", "44rpx"], // 大号
      xl: ["40rpx", "48rpx"], // 特大号
      "2xl": ["48rpx", "56rpx"], // 双倍大号
      "3xl": ["56rpx", "64rpx"], // 三倍大号
    },
  },
});
