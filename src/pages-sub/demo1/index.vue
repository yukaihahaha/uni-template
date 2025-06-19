<route lang="json5">
{
  layout: 'default',
  name: 'Demp',
  style: {
    navigationBarTitleText: 'Demo1',
  },
}
</route>
<template>
  <view class="text-center m-4">
    <image class="h-40 w-40" src="@images/niwo.jpg" />
    <view class="my-4">
      <text class="text-gray-400 font-bold">{{ LYK }}</text>
    </view>
    <view class="text-center font-bold text-4xl">
      {{ countStore.count }}
    </view>
    <view class="flex my-4">
      <button class="sn-btn-default" @click="handlePlus">
        <view class="sn-icon-park-outline:plus mr-1"></view>
        增加
      </button>
      <button class="sn-btn-default" @click="handleReset">
        <view class="sn-icon-park-outline:plus mr-1"></view>
        重置2
      </button>
      <button class="sn-btn-default" @click="handleMinus">
        <view class="sn-icon-park-outline:minus mr-1"></view>
        减少
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useCountStore } from '@/store';
defineOptions({
  name: 'Demo1',
});
const countStore = useCountStore();
const LYK = ref<string>('LTK');

const handlePlus = () => {
  countStore.increment();
};

const handleMinus = () => {
  countStore.decrement();
};
const handleReset = () => {
  countStore.reset();
};
</script>

<style lang="scss" scoped>
//
</style>
