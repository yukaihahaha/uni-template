<route lang="json5" type="home">
{
  layout: "default",
  name: "Home",
  style: {
    navigationBarTitleText: "Home",
  },
}
</route>
<template>
  <view class="text-center m-4">
    <image class="h-40 w-40" src="@images/niwo.jpg" />
    <view class="my-4">
      <text class="text-gray-400 font-bold">{{ LYK }}</text> </view
    ><wd-checkbox v-model="value" @change="handleChange">单选框1</wd-checkbox>
    <wd-button @click="handleAccountLogin"> 2登录2 </wd-button
    ><wd-switch v-model="checked" />
  </view>
</template>

<script lang="ts" setup>
import { needLoginPages, isTableBar } from "@/utils/index";
import { useToast } from "wot-design-uni";
const toast = useToast();
defineOptions({
  name: "Home",
});
const value = ref<boolean>(true);
const checked = ref<boolean>(true);
function handleChange({ value }) {
  console.log(value);
}
const LYK = ref<string>("LTK");
const handleAccountLogin = async () => {
  uni.navigateTo({
    url: "/pages-sub/demo/index",
  });
};
</script>

<style></style>
