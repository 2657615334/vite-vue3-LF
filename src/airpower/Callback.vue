<template>
  <div v-loading="true" class="callback big-loading" />
</template>
<script lang="ts" setup>
import { AppConfig } from './AppConfig'
import { AirOauthService } from './service/AirOauthService'
import { AirNotification } from './feedback/AirNotification'

async function getToken() {
  if (AppConfig.router) {
    try {
      const code = AppConfig.router.currentRoute.value.query.code || ''
      const ssoResponse = await new AirOauthService().getAccessToken(code.toString())
      AppConfig.saveAccessToken(ssoResponse.accessToken)
      // eslint-disable-next-line no-restricted-globals
      location.replace(AppConfig.getLastPath() || '/')
    } catch (e) {
      AppConfig.router.push('/login')
    }
  } else {
    new AirNotification().setTitle('跳转失败')
    .setMessage('请先为AppConfig注入Router')
    .error()
  }
}
getToken()
</script>
<style scoped lang="scss">
.callback {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  flex-direction: column;
  background: #eee;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 300;
  color: #999;
}

.big-loading {
  .el-loading-spinner .circular {
    width: 66px;
    height: 66px;
  }

  .el-loading-spinner .path {
    stroke-width: 2;
  }
}
</style>
