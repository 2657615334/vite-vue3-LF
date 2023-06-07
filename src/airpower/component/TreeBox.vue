<template>
  <div class="air-tree-box">
    <div class="air-tree-box-left" :style="{ width: width + 'px' }">
      <APanel
        hide-footer
        :title="title"
        :show-title="!hideTitle"
        :hide-icon="hideIcon"
      >
        <template #icon>
          <slot name="icon" />
        </template>
        <el-tree
          ref="treeRef"
          v-loading="isTreeLoading"
          :data="treeData"
          :props="AppConfig.defaultTreeProps"
          :default-expand-all="defaultExpandAll"
          highlight-current
          :current-node-key="currentData ? currentData.id : 0"
          :expand-on-click-node="false"
          node-key="id"
          @node-click="treeSelectChanged"
        />
      </APanel>
    </div>
    <div class="air-tree-box-right">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup="props">
import { TreeKey } from 'element-plus/es/components/tree/src/tree.type'
import { PropType, Ref, ref } from 'vue'
import { APanel } from '.'
import { AppConfig } from '../AppConfig'
import { ITree } from '../interface/ITree'
import { AirTreeInstance } from '../type/AirType'

defineProps({
  /**
   * # 是否默认展开全部
   */
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },

  /**
   * # 左侧树的数据
   */
  treeData: {
    type: Array as PropType<ITree[]>,
    default: () => [],
  },

  /**
   * # 是否显示图标
   */
  hideIcon: {
    type: Boolean,
    default: false,
  },

  /**
   * # 树是否正在加载
   */
  isTreeLoading: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否隐藏标题
   */
  hideTitle: {
    type: Boolean,
    default: false,
  },

  /**
   * # 标题
   */
  title: {
    type: String,
    default: '请选择',
  },

  /**
   * # 左侧树的宽度
   */
  width: {
    type: Number,
    default: 300,
  },
})

// eslint-disable-next-line no-unused-vars
const emits = defineEmits<{(event: 'onChange', selectNode: any): void;
}>()

/**
 * 树的实例
 */
const treeRef = ref<AirTreeInstance>()

/**
 * 当前选中的数据
 */
const currentData: Ref<ITree | undefined> = ref()

/**
 * 树节点选中事件
 * @param row 
 */
function treeSelectChanged(row: ITree) {
  if (currentData.value && row.id === currentData.value.id) {
    currentData.value = undefined
    if (treeRef.value) {
      treeRef.value.setCurrentKey(null as unknown as TreeKey)
    }
  } else {
    currentData.value = row
  }
  emits('onChange', currentData.value)
}
</script>

<style lang="scss">
.air-tree-box {
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 0;
  overflow: hidden;
  position: relative;

  &-left {
    width: 300px;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
  }

  &-right {
    flex: 1;
    width: 0;
    display: flex;
    flex-direction: column;
  }

  .el-tree-node__label {
    flex: 1;
    width: 0;
    margin-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
  }
}
</style>
