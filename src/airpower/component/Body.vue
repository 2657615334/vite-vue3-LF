<template>
  <div class="air-body">
    <div class="air-left" :class="collapseRef ? 'left-collapse' : ''">
      <div
        class="air-logo"
        :class="collapseRef ? 'collapse' : ''"
        @click="returnToHome()"
      >
        <slot name="logo">
          <el-image :src="AirFileHelper.getStaticFileUrl(config.logoIcon)">
            <template #error>
              <el-image class="default" :src="image" />
            </template>
          </el-image>
          <span>{{ config.appName }}</span>
        </slot>
      </div>
      <div v-loading="!menuList" class="air-menu">
        <AMenu
          v-if="menuList"
          :collapse="collapseRef"
          :menu-list="menuList"
          @menuClicked="menuClicked"
        />
      </div>
      <div v-if="!collapseRef" class="air-copyright">
        <slot name="copyright">
          <el-image :src="AirFileHelper.getStaticFileUrl(config.partnerLogoIcon)">
            <template #error> Powered by HoldHope Cloud </template>
          </el-image>
        </slot>
      </div>
    </div>
    <div class="air-right">
      <div class="air-header">
        <div v-if="!disableCollapse" class="air-expand">
          <i
            class="airpower icon-commonicon_shouqi"
            :class="collapseRef ? 'expand' : ''"
            @click="collapseChanged"
          />
        </div>
        <div class="air-navigator">
          <slot name="navigator">
            <el-breadcrumb separator-icon="ArrowRight">
              <el-breadcrumb-item v-for="bread in breadList" :key="bread.id">
                {{ bread.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </slot>
        </div>
        <slot name="menu">
          <div class="air-menu">
            <span class="item" @click="returnToIndex"
              ><i class="airpower icon-commonicon_yindao" />控制台</span
            >
          </div>
        </slot>
        <slot name="user">
          <AUser :user="user" @command="handleCommand" />
        </slot>
      </div>
      <div class="air-main">
        <slot name="main" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from "vue";
import { AMenu, AUser } from ".";
import { AirMenu } from "../model/AirMenu";
import { AirUser } from "../model/AirUser";
import { AppConfig } from "../AppConfig";
import { AirPlatformConfig } from "../dto/AirPlatformConfig";
// import { AirCommonService } from "../service/AirCommonService";
import { AirFileHelper } from "../helper/AirFileHelper";
import { AirStore } from "../store/AirStore";

import image from "../assets/img/logo.png";

const props = defineProps({
  /**
   * # 初始化是否收起
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

  /**
   * # 用户信息 AirUser对象
   */
  user: {
    type: AirUser,
    default: () => new AirUser(),
  },

  /**
   * # 显示的头像
   */
  avatar: {
    type: String,
    default: () => "",
  },

  /**
   * # 禁用菜单的收起展开
   */
  disableCollapse: {
    type: Boolean,
    default: false,
  },
});

/**
 * 是否收起
 */
const collapseRef = ref(false);

function collapseChanged() {
  collapseRef.value = !collapseRef.value;
  AirStore().menuCollapsed = collapseRef.value;
}
const config = ref(new AirPlatformConfig());

const init = async () => {
  collapseRef.value = props.collapse;
  // config.value = await new AirCommonService().getCurrentTenantLogoConfig()
};
init();

/**
 * 回调事件
 */
const emits = defineEmits(["menuClicked", "userCommand", "onMenuClick", "onUserCommand"]);

/**
 * 菜单点击事件
 * @param url URL
 */
function menuClicked(url: string) {
  emits("onMenuClick", url);
  emits("menuClicked", url); // TODO 即将弃用
}

/**
 * 下拉菜单点击事件
 * @param cmd 指令
 */
function handleCommand(cmd: string) {
  emits("onUserCommand", cmd);
  emits("userCommand", cmd); // TODO 即将弃用
}

function returnToHome() {
  AppConfig.router.push("/");
}

function returnToIndex() {
  // eslint-disable-next-line no-restricted-globals
  location.href = AppConfig.homeUrl;
}

/**
 * 判断路由是否在菜单链中
 * @param menu 菜单
 */
const isChildMenu = (menu: AirMenu): boolean => {
  let isContain = false;
  if (menu.children && menu.children.length > 0) {
    for (const sub of menu.children) {
      isContain = isChildMenu(sub);
      if (isContain) {
        break;
      }
    }
  } else if (AppConfig.router && menu.path === AppConfig.router.currentRoute.value.path) {
    isContain = true;
  }
  return isContain;
};

/**
 * 获取菜单链
 * @param menuList
 */
const getMenuTraceList = (menuList: AirMenu[]) => {
  let list: AirMenu[] = [];
  for (const menu of menuList) {
    if (isChildMenu(menu)) {
      list.push(menu);
    }
    if (menu.children && menu.children.length > 0) {
      list = list.concat(getMenuTraceList(menu.children));
    }
  }
  return list;
};

/**
 * 面包屑菜单链
 */
const breadList = computed(() => getMenuTraceList(props.menuList));
</script>

<style scoped lang="scss">
.air-body {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;

  .air-left {
    width: 250px;
    display: flex;
    flex-direction: column;
    background: #333;
    color: #fff;
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.1);
    transition: width 0.5s;

    .air-logo {
      word-break: keep-all;
      text-align: left;
      // transition: all 0.5s;
      cursor: pointer;

      .el-image {
        width: 34px;
        height: 34px;
        overflow: hidden;

        img {
          width: 34px;
          height: 34px;
        }
      }

      span {
        margin-left: 16px;
        font-size: 24px;
        font-weight: bold;
        color: var(--el-color-primary);
      }

      &:hover {
        background-color: #222;
      }
    }

    .air-menu {
      flex: 1;
      height: 0;
      overflow: hidden;
      overflow-y: auto;
    }

    .air-menu::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }

  .left-collapse {
    width: 60px;

    .air-logo {
      padding: 10px;
    }
  }

  .air-right {
    flex: 1;
    width: 0;
    display: flex;
    flex-direction: column;
    background: #eaf1f5;

    .air-header {
      padding: 10px 20px 10px 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color: #fff;

      .air-expand {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 22px;
        height: 22px;
        margin-right: 10px;

        .airpower {
          padding: 5px;
          border-radius: 3px;
          color: #666;
          transition: all 0.3s;
          cursor: pointer;
        }

        .airpower:hover {
          background-color: #fff;
        }

        .expand {
          transform: rotate(180deg);
        }
      }

      .air-navigator {
        flex: 1;
        font-size: 14px;
        color: #aaa;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        width: 0;
        margin-right: 20px;

        .menu-item {
          padding: 8px 30px;
          color: #333;
          cursor: pointer;
          border-radius: 5px;
          transition: all 0.3s;
          font-weight: bold;
          word-break: keep-all;
          white-space: nowrap;
        }

        .menu-item:hover {
          background-color: #f5f5f5;
        }

        .is-active {
          position: relative;
        }

        .is-active::after {
          content: " ";
          background-color: var(--el-color-primary);
          height: 2px;
          position: absolute;
          left: 5px;
          right: 5px;
          bottom: 0;
        }
      }

      .air-menu {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0px 10px;

        .item {
          padding: 5px 15px;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 14px;
          border-radius: 5px;
          color: var(--el-color-primary);
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          i {
            margin-right: 3px;
            font-weight: bold;
          }
        }

        .item:hover {
          background-color: #f5f5f5;
        }
      }
    }

    .air-main {
      flex: 1;
      height: 0;
      margin: 10px;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
<style lang="scss">
.air-left {
  .air-logo {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 20px;
    padding: 10px 20px;
  }

  .collapse {
    > * {
      display: none;
    }

    img,
    .el-image {
      display: inline-block;
      margin: 0 !important;
    }
  }

  .air-logo.collapse {
    justify-content: center;
  }

  .air-menu {
    .el-loading-mask {
      background-color: rgba($color: #000000, $alpha: 0.1);
    }
  }

  .air-copyright {
    font-size: 14px;
    color: #999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
    word-break: keep-all;
    white-space: nowrap;

    .el-image {
      height: 24px;

      img {
        height: 100%;
      }
      .el-image__wrapper {
        position: relative;
        left: auto;
        right: auto;
        top: auto;
      }
    }
  }
}
</style>
