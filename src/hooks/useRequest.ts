import { ref, UnwrapRef } from "vue";

type UseRequestOptions<T> = {
  immediate?: boolean; // 是否立即执行请求，默认 false
  initialData?: T;     // 初始化数据
};

export default function useRequest<T>(
  func: () => Promise<{ code: number; message: string; data: T }>,
  options: UseRequestOptions<T> = {}
) {
  const loading = ref(false);
  const error = ref<false | Error>(false);
  const data = ref<UnwrapRef<T> | any>(options.initialData);

  const run = async (): Promise<UnwrapRef<T>> => {
    loading.value = true;
    error.value = false;

    try {
      const res = await func();
      if (res.code === 200) {
        data.value = res.data as UnwrapRef<T>;
        return data.value;
      } else {
        throw new Error(res.message || "请求失败");
      }
    } catch (err: any) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  if (options.immediate) run();

  return { loading, error, data, run };
}
