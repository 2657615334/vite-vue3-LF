<template>
  <el-tooltip effect="customized" content="点击复制" placement="top">
    <el-link :underline="false" @click="copy">
      <!-- 自定义显示的插槽 -->
      <slot>{{ content }}</slot>
    </el-link>
  </el-tooltip>
</template>
<script lang="ts" setup>
import userClipboard from 'vue-clipboard3'
import { AirNotification } from '../feedback/AirNotification'

const props = defineProps({
  /** 
   * # 复制的内容
   */
  content: {
    type: String,
    default: '-',
  },
})

const { toClipboard } = userClipboard()

async function copy() {
  await toClipboard(props.content)
  new AirNotification().setTitle('复制成功')
  .setMessage('选择的内容已经复制到剪切板!')
  .success()
}
</script>
<style  lang="scss">
.air-friend-datetime,
.air-friend-datetime * {
  user-select: none !important;

  .is-disabled {
    color: #333;
  }
}
</style>
