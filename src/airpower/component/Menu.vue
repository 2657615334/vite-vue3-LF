<template>
  <el-menu
    class="air-menu-tree"
    :collapse="collapse"
    :default-active="defaultMenu"
    :router="true"
  >
    <ChildMenu :menu-list="menuList" />
  </el-menu>
</template>

<script lang="ts" setup>
import { PropType, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { AirMenu } from '../model/AirMenu'
import ChildMenu from './menu/ChildMenu.vue'

defineProps({
  /** 
   * # 是否收起
   */
  collapse: {
    type: Boolean,
    default: false,
  },

  /** 
   * # 菜单列表
   */
  menuList: {
    type: Array as PropType<AirMenu[]>,
    default: () => [],
  },
})

/**
 * 菜单状态激活
 */
// eslint-disable-next-line no-restricted-globals
const defaultMenu = ref(location.pathname)

/**
 * 路由
 */
const route = useRoute()

/**
 * 监听路由
 */
watch(
  () => route,
  // eslint-disable-next-line
  (newVal, oldVal) => {
    // eslint-disable-next-line no-restricted-globals
    defaultMenu.value = newVal.path || location.pathname
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<style lang="scss">
.el-menu,
.air-menu-tree {
  background-color: transparent;
  border: none;

  .el-sub-menu__title,
  .el-menu-item {
    color: #aaa;
  }

  .el-sub-menu__title:hover,
  .el-menu-item:hover,
  .el-menu-item.is-active {
    color: white;
    background-color: var(--primary-color);
  }

  .airpower {
    margin-right: 5px;
    display: inline-block;
    font-size: 16px;
  }
}
</style>
