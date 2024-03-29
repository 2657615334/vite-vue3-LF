<template>
  <div class="air-group" :class="autoHeight ? 'auto-height' : ''">
    <div v-if="title" class="group-title">
      <div class="left">
        <div class="title">
          <span>{{ title }}</span>
          <slot name="tips" />
        </div>
        <div class="custom">
          <slot name="custom" />
        </div>
      </div>
      <div v-if="!disableCollapse" class="expand">
        <el-icon @click="isCollapse = !isCollapse">
          <ArrowRight v-if="isCollapse" />
          <ArrowDown v-else />
        </el-icon>
      </div>
    </div>
    <div v-show="!isCollapse" class="group-body" :class="getBodyClass()">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup="props">
import { ref } from 'vue'

const props = defineProps({
  /** 
   * # 分组标题
   */
  title: {
    type: String,
    default: '',
  },

  /** 
   * # 列数 1-3
   */
  column: {
    type: Number,
    default: 1,
  },

  /** 
   * # 自适应高度
   */
  autoHeight: {
    type: Boolean,
    default: false,
  },

  /** 
   * # 列数自适应
   */
  autoCol: {
    type: Boolean,
    default: false,
  },

  /** 
   * # 是否禁用展开收起
   */
  disableCollapse: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否默认收起
   */
  collapse: {
    type: Boolean,
    dafault: false,
  },
})

/**
 * 获取合理的列数
 */
function getColumn() {
  if (!props.column || props.column < 1) {
    return 1
  }
  if (props.column > 3) {
    return 3
  }
  return props.column
}

const isCollapse = ref(true)

function init() {
  isCollapse.value = props.collapse
}
init()

/**
 * 获取body的样式类
 */
function getBodyClass() {
  let cls = ''
  if (props.autoCol) {
    cls += 'column-auto '
  } else {
    cls += `column-${getColumn()} `
  }
  return cls
}
</script>

<style lang="scss">
.air-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  .group-body {
    flex-direction: row;
    flex-wrap: wrap;
    display: flex;

    .el-cascader,
    .el-select {
      width: 100%;
    }
  }

  .column-auto {
    >* {
      width: 320px;
      min-width: 33.333333333%;
      margin: 10px 0;
    }
  }

  .column-1>* {
    width: 100%;
  }

  .column-2 {
    display: flex;

    >* {
      width: 46%;
      margin: 10px 2%;
    }
  }

  .column-3 {
    display: flex;

    >* {
      width: 29.3333333%;
      margin: 10px 2%;
    }
  }

  .group-title {
    font-size: 16px;
    padding-top: 5px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 3px;
    margin-bottom: 10px;

    .left {
      flex: 1;
      font-weight: 400;
      display: flex;
      flex-direction: row;

      .title {
        flex: 1;
        width: 0;
        display: flex;
        flex-direction: row;
        align-items: center;

        span {
          border-bottom: 3px solid var(--primary-color);
          padding-bottom: 2px;
        }
      }
    }

    .expand {
      .el-icon {
        cursor: pointer;
        padding-left: 10px;
        padding-right: 5px;
        transition: color 0.3s;

        &:hover {
          color: var(--primary-color)
        }
      }
    }
  }

}

.air-group.auto-height {
  flex: 1;
  height: 0;
  margin-bottom: 0px;

  .group-body {
    flex: 1;
    height: 0;
    overflow: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column
  }
}
</style>
