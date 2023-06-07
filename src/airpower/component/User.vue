<template>
  <el-dropdown trigger="click" @command="commandEvent($event)">
    <span class="el-dropdown-link">
      <div class="air-user">
        <el-avatar :size="30" :src="user.avatar" class="air-user-avatar">
          <template #default>{{ user.getShortName() }}</template>
        </el-avatar>
        <div class="air-user-name">{{ user.name }}</div>
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-if="!hideProfile" command="modify">
          <el-icon>
            <chat-line-square />
          </el-icon>修改资料
        </el-dropdown-item>
        <el-dropdown-item v-if="!hidePassword" command="password">
          <el-icon>
            <lock />
          </el-icon>修改密码
        </el-dropdown-item>
        <el-dropdown-item v-if="!hideTenant && AppConfig.allowChangeTenant" command="tenant">
          <el-icon>
            <set-up />
          </el-icon>我的企业
        </el-dropdown-item>
        <slot />
        <el-dropdown-item v-if="!hideLogout" command="logout" divided>
          <el-icon>
            <switch-button />
          </el-icon>退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import { AirUser } from '../model/AirUser'
import { AppConfig } from '../AppConfig'
import { AirConfirm } from '../feedback/AirConfirm'
import { AirOauthService } from '../service/AirOauthService'

defineProps({
  /** 
   * # AirUser用户对象
   */
  user: {
    type: AirUser,
    default: () => new AirUser(),
  },

  /** 
   * # 隐藏修改资料
   */
  hideProfile: {
    type: Boolean,
    default: false,
  },

  /** 
   * # 隐藏修改密码
   */
  hidePassword: {
    type: Boolean,
    default: false,
  },

  /** 
   * # 隐藏切换企业
   */
  hideTenant: {
    type: Boolean,
    default: false,
  },

  /** 
   * # 隐藏退出登录
   */
  hideLogout: {
    type: Boolean,
    default: false,
  },
})

/**
 * 回调指令
 */
// eslint-disable-next-line no-unused-vars
const emits = defineEmits<{(event: 'command', cmd: string): void;
  // eslint-disable-next-line no-unused-vars
  (event: 'onCommand', cmd: string): void;
}>()

/**
 * 右上角菜单点击事件
 * @param cmd 
 */
async function commandEvent(cmd: string) {
  switch (cmd) {
    case 'modify':
      window.open(`${AppConfig.ssoUrl}login/modifyUri`)
      break
    case 'password':
      window.open(`${AppConfig.ssoUrl}login/changePassword`)
      break
    case 'tenant':
      // eslint-disable-next-line no-restricted-globals
      location.replace(`${AppConfig.ssoUrl}login/selectUrl?autoRedirect=0&redirectUri=${encodeURIComponent(location.href)}`)
      break
    case 'logout':
      await new AirConfirm().setTitle('退出登录')
      .setContent('是否确认退出当前登录的用户?')
      .warning()
      try {
        await new AirOauthService().logout()
      } catch (e) {
        console.log(e)
      }
      AppConfig.removeAccessToken()
      // eslint-disable-next-line no-unused-expressions
      AppConfig.router?.replace('/login')
      break
    default:
      emits('onCommand', cmd)
      emits('command', cmd)
  }
}
</script>
<style scoped lang="scss">
.air-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  .air-user-name {
    margin-left: 5px;
    font-size: 16px;
    color: #666;
  }
}
</style>
<style lang="scss">
.air-user:hover {
  .air-user-avatar {
    background-color: #aaa;
  }

  .air-user-name {
    color: #333;
  }
}
</style>
