<template>
  <ADialog
    title="用户详情"
    hide-ctrl
    width="500"
    height="300"
    @onConfirm="onConfirm()"
    @onCancel="onCancel()"
  >
    <template #body>
      <div>
        标准对象数据：<br />

        {{ param }}
      </div>
      <hr />
      <div>
        原始接口数据:<br />

        {{ param.toSourceString() }}
      </div>
      <el-button @click="newDialog">new dialog</el-button>
    </template>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog } from "@/airpower/component";
import { UserEntity } from "@/entity/UserEntity";
import showDetail from "./index";

defineProps({
  onConfirm: {
    type: Function,
    default: () => null,
  },
  onCancel: {
    type: Function,
    default: () => null,
  },
  param: {
    type: UserEntity,
    default: () => null,
  },
});

function newDialog() {
  showDetail(new UserEntity().setId(123));
}
</script>

<style scoped lang="scss"></style>
