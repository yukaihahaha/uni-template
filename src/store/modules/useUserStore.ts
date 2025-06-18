// store/modules/user.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import request from '@/utils/request';

export const useUserStore = defineStore(
  'user',
  () => {
    /** 用户信息 */
    const userInfo = ref<any>(null);

    /** Token */
    const token = ref<string>('');

    /** 设置用户信息 */
    const setUserInfo = (val: any) => {
      userInfo.value = val;
    };

    /** 设置 Token */
    const setToken = (val: string) => {
      token.value = val;
    };

    /** 清除用户信息和 Token */
    const removeUserInfo = () => {
      userInfo.value = null;
      token.value = '';
    };

    /** 登录 */
    const login = async (data: { username: string; password: string }) => {
      const res = await request<{ token: string }>({
        url: '/api/login',
        method: 'POST',
        data,
        showLoading: true,
      });
      setToken(res.data.token);
      await getUserInfo();
    };

    /** 获取用户信息 */
    const getUserInfo = async () => {
      const res = await request<{ name: string; avatar?: string }>({
        url: '/api/user/info',
        method: 'GET',
        header: {
          Authorization: token.value,
        },
        showLoading: false,
      });
      setUserInfo(res.data);
    };

    /** 退出登录 */
    const logout = async () => {
      try {
        await request({
          url: '/api/logout',
          method: 'POST',
          header: {
            Authorization: token.value,
          },
          showLoading: false,
        });
      } catch {
        // 忽略错误
      }
      removeUserInfo();
      uni.redirectTo({ url: '/pages/login/index' });
    };

    return {
      userInfo,
      token,
      setUserInfo,
      setToken,
      removeUserInfo,
      login,
      getUserInfo,
      logout,
    };
  },
  {
    persist: true, // 开启持久化
  },
);
