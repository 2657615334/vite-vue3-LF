<template>
  <div class="air-panel" :class="isFullScreen ? 'fullscreen' : ''">
    <div v-if="showTitle" class="panel-header">
      <div class="panel-left">
        <div v-if="!hideIcon" class="panel-icon">
          <slot name="icon">
            <el-icon>
              <platform />
            </el-icon>
          </slot>
        </div>
        <div class="panel-title">{{ title || "未指定title" }}</div>
      </div>
      <div class="panel-right">
        <slot name="headerRight" />
        <el-tooltip
          v-if="!fullable"
          effect="customized"
          content="全屏/退出全屏"
          placement="left"
        >
          <div class="panel-full" @click="isFullScreen = !isFullScreen">
            <el-icon>
              <monitor />
            </el-icon>
          </div>
        </el-tooltip>
      </div>
    </div>
    <div class="panel-body">
      <slot name="body" />
      <slot />
    </div>
    <div v-if="!hideFooter" class="panel-footer">
      <div class="panel-footer-left">
        <slot name="footerLeft" />
      </div>
      <div class="panel-footer-right">
        <slot name="footerRight" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AppConfig } from '../AppConfig'

defineProps({
  /** 
   * # 😄卡片的标题
   * 默认读取当前路由元数据里的name属性
   */
  title: {
    type: String,
    default: () => AppConfig.router.currentRoute.value.meta.name as string || '',
  },

  /** 
   * # 😄描述
   */
  description: {
    type: String,
    default: '',
  },

  /**
   * # 😄是否显示标题
   */
  showTitle: {
    type: Boolean,
    default: false,
  },

  /**
   * # 😄是否隐藏底部
   */
  hideFooter: {
    type: Boolean,
    default: false,
  },

  /**
   * # 😄是否显示图标
   */
  hideIcon: {
    type: Boolean,
    default: false,
  },
  
  /**
   * # 😄是否允许全屏
   */
  fullable: {
    type: Boolean,
    default: true,
  },
})

/**
 * 是否全屏
 */
const isFullScreen = ref(false)
</script>

<style scoped lang="scss">
.air-panel {
  display: flex;
  flex: 1;
  height: 0;
  flex-direction: column;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  background: white;
  border-radius: 6px;
  overflow: hidden;

  .panel-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    padding: 10px 15px;
    padding-bottom: 10px;

    .panel-left {
      flex: 1;
      width: 0;
      display: flex;
      flex-direction: row;
      align-items: center;

      .panel-icon {
        font-size: 20px;
        color: var(--el-color-primary);
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .panel-title {
        font-size: 16px;
        color: #333;
        font-weight: bold;
        margin-left: 3px;
      }
    }

    .panel-right {
      color: #aaa;
      font-size: 14px;

      .panel-full {
        font-size: 20px;
        cursor: pointer;
        font-weight: bold;
        margin: -5px 0px;
        transition: all 0.3s;
      }

      .panel-full:hover {
        color: var(--primary-color);
      }
    }
  }

  .panel-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    height: 0;
    padding: 20px;
    position: relative;
  }

  .panel-footer {
    padding: 0px 20px 20px 20px;
    display: flex;
    flex-direction: row;

    .panel-footer-left {
      flex: 1;
      width: 0;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center
    }

    .panel-footer-right {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
  }
}

.fullscreen {
  position: fixed !important;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 10;
}
</style>
