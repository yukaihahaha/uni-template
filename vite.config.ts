import { defineConfig, loadEnv } from "vite";
import Uni from "@dcloudio/vite-plugin-uni";
import * as path from "node:path";
import AutoImport from "unplugin-auto-import/vite"; // 自动导入Vue、uni-app相关API插件。
import Components from "@uni-helper/vite-plugin-uni-components";
import { WotResolver } from "@uni-helper/vite-plugin-uni-components/resolvers";// 引入wot-ui 

// @see https://github.com/antfu/vite-plugin-restart?tab=readme-ov-file#readme   监听文件来重启 Vite 服务器
import ViteRestart from "vite-plugin-restart"; //只在h5生效
// @see https://uni-helper.js.org/vite-plugin-uni-pages  让你无需手动配置pages.json 页面配置router自动生成。
import UniPages from "@uni-helper/vite-plugin-uni-pages";
// @see https://github.com/uni-helper/vite-plugin-uni-manifest  uni 插件，支持 manifest.config.ts 编写 manifest.json
import UniManifest from "@uni-helper/vite-plugin-uni-manifest";
// @see https://github.com/uni-helper/vite-plugin-uni-platform  基于文件名 (.<h5|mp-weixin|app>.) 的按平台编译插件，需配合vite-plugin-uni-pages使用。
import UniPlatform from "@uni-helper/vite-plugin-uni-platform";
// @see https://uni-helper.js.org/vite-plugin-uni-layouts 自动生成页面布局插件，使用layouts文件夹配置。
import UniLayouts from "@uni-helper/vite-plugin-uni-layouts";

// https://vitejs.dev/config/
export default async ({ command, mode }) => {
  const { default: UnoCss } = await import("unocss/vite");
  const env = loadEnv(mode, path.resolve(process.cwd(), "env"));
  const { UNI_PLATFORM } = process.env; // 从环境变量中获取UNI_PLATFORM
  const {
    VITE_APP_PORT,
    VITE_SERVER_BASEURL,
    VITE_DELETE_CONSOLE,
    VITE_SHOW_SOURCEMAP,
    VITE_APP_PROXY,
    VITE_APP_PROXY_PREFIX,
  } = env;
  console.log("环境变量 env -> ", env);
  return defineConfig({
    envDir: "./env", // 自定义env目录
    resolve: {
      alias: {
        "@": path.join(process.cwd(), "./src"),
        "@images": path.join(process.cwd(), "./src/static/images"),
      },
    },
    define: {
      __UNI_PLATFORM__: JSON.stringify(UNI_PLATFORM),
      __VITE_APP_PROXY__: JSON.stringify(VITE_APP_PROXY),
    },
    server: {
      host: "0.0.0.0",
      hmr: true,
      port: Number.parseInt(VITE_APP_PORT, 10),
      // 仅 H5 端生效，其他端不生效（其他端走build，不走devServer)
      proxy: JSON.parse(VITE_APP_PROXY)
        ? {
            [VITE_APP_PROXY_PREFIX]: {
              target: VITE_SERVER_BASEURL,
              changeOrigin: true,
              rewrite: (path) =>
                path.replace(new RegExp(`^${VITE_APP_PROXY_PREFIX}`), ""),
            },
          }
        : undefined,
    },
    build: {
      sourcemap: false,
      // 方便非h5端调试
      // sourcemap: VITE_SHOW_SOURCEMAP === 'true', // 默认是false
      target: "es6",
      // 开发环境不用压缩
      minify: mode === "development" ? false : "terser",
      terserOptions: {
        compress: {
          drop_console: VITE_DELETE_CONSOLE === "true",
          drop_debugger: true,
        },
      },
    },
    plugins: [
      UnoCss(),
      UniManifest(),
      UniPlatform(),
      UniLayouts(),
      UniPages({
        dts: "src/types/uni-pages.d.ts",
        exclude: ["**/components/**/**.*"],
        routeBlockLang: "json5", // 虽然设了默认值，但是vue文件还是要加上 lang="json5", 这样才能很好地格式化
        // homePage 通过 vue 文件的 route-block 的type="home"来设定
        // pages 目录为 src/pages，分包目录不能配置在pages目录下  homePage: "pages/index/index",
        subPackages: ["src/pages-sub"], // 是个数组，可以配置多个，但是不能为pages里面的目录
      }),
      Components({
        resolvers: [
          WotResolver(), // wot-ui 组件库的解析器，自动导入组件
        ],
        extensions: ["vue"],
        deep: true, // 是否递归扫描子目录，
        directoryAsNamespace: false, // 是否把目录名作为命名空间前缀，true 时组件名为 目录名+组件名，
        dts: "src/types/components.d.ts", // 自动生成的组件类型声明文件路径（用于 TypeScript 支持）
      }),
      ViteRestart({
        restart: ["vite.config.ts"], // 监听vite.config.js文件修改,无需重启
      }),
      AutoImport({
        imports: ["vue", "uni-app"],
        dts: "src/types/auto-import.d.ts",
        dirs: ["src/hooks"], // 自动导入 hooks
        vueTemplate: true, // default false
      }),
      Uni(),
    ],
  });
};
