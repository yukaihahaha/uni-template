import { defineConfig, loadEnv } from "vite";
import Uni from "@dcloudio/vite-plugin-uni";
import * as path from "node:path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "@uni-helper/vite-plugin-uni-components";
import { WotResolver } from "@uni-helper/vite-plugin-uni-components/resolvers";

// https://vitejs.dev/config/
export default async ({ command, mode }) => {
  const UnoCss = await import("unocss/vite").then((i) => i.default);
  const env = loadEnv(mode, path.resolve(process.cwd(), "env"));
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
         '@images': path.join(process.cwd(), './src/static/images'),
      },
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
      Components({
        resolvers: [WotResolver()],
        extensions: ["vue"],
        deep: true, // 是否递归扫描子目录，
        directoryAsNamespace: false, // 是否把目录名作为命名空间前缀，true 时组件名为 目录名+组件名，
        dts: "src/types/components.d.ts", // 自动生成的组件类型声明文件路径（用于 TypeScript 支持）
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
