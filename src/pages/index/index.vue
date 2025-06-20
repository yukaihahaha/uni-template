<route lang="json5" type="home">
{
  layout: 'default',
  name: 'Home',
  style: {
    navigationBarTitleText: 'Home',
  },
}
</route>
<template>
  <view class="text-center m-4">
    <image class="h-40 w-40" src="@images/niwo.jpg" />
    <view class="my-4">
      <text class="text-gray-400 font-bold">{{ LYK }}</text> </view
    ><view class="my-2">
    </view>
    <wd-button @click="handleAccountLogin"> Login </wd-button>
  </view>
</template>

<script lang="ts" setup>
import { useToast } from "wot-design-uni";

const toast = useToast();

defineOptions({
  name: "Home",
});

const LYK = ref<string>("LTK");

const handleAccountLogin = async () => {
  // uni.navigateTo({
  //   url: "/pages/login/index?type=1&a=3",
  // });
  toast.success("321");
};
</script>

<style lang="scss" scoped>
//
</style>

