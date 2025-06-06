import { defineStore } from "pinia";
import { ref } from "vue";

// 初始化状态
const userInfoState = {
  id: 0,
  username: "",
  avatar: "/static/images/default-avatar.png",
  token: "",
};

export const useUserStore = defineStore(
  "user",
  () => {
    // 定义用户信息
    const userInfo = ref({ ...userInfoState });
    // 设置用户信息
    const setUserInfo = (val) => {
      console.log("设置用户信息", val);
      // 若头像为空 则使用默认头像
      if (!val.avatar) {
        val.avatar = userInfoState.avatar;
      } else {
        val.avatar = "@img/niwo.png";
      }
      userInfo.value = val;
    };
    // 删除用户信息
    const removeUserInfo = () => {
      userInfo.value = { ...userInfoState };
      uni.removeStorageSync("userInfo");
      uni.removeStorageSync("token");
    };
    /**
     * 用户登录
     * @param credentials 登录参数
     * @returns R<IUserLogin>
     */
    const login = async (credentials: {
      username: string;
      password: string;
      code: string;
      uuid: string;
    }) => {
      // const res = await _login(credentials)
      // console.log('登录信息', res)
      // toast.success('登录成功')
      // getUserInfo()
      // return res
    };
    /**
     * 获取用户信息
     */
    const getUserInfo = async () => {
      // const res = await _getUserInfo()
      // const userInfo = res.data
      // setUserInfo(userInfo)
      // uni.setStorageSync('userInfo', userInfo)
      // uni.setStorageSync('token', userInfo.token)
      // // TODO 这里可以增加获取用户路由的方法 根据用户的角色动态生成路由
      // return res
    };
    /**
     * 退出登录 并 删除用户信息
     */
    const logout = async () => {
      // _logout()
      // removeUserInfo()
    };
    /**
     * 微信登录
     */
    const wxLogin = async () => {
      // 获取微信小程序登录的code
      // const data = await getWxCode()
      // console.log('微信登录code', data)
      // const res = await _wxLogin(data)
      // getUserInfo()
      // return res
    };

    return {
      userInfo,
      login,
      wxLogin,
      getUserInfo,
      logout,
    };
  },
  {
    persist: true,
  }
);
