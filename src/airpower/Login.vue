<template>
  <div v-loading="true" class="login big-loading" />
</template>
<script lang="ts" setup>
import { AppConfig } from './AppConfig'

function getSsoInfo() {
  // eslint-disable-next-line no-restricted-globals
  location.replace(`${AppConfig.ssoUrl}login?appId=${AppConfig.appId}&redirectUri=${encodeURIComponent(`${location.origin}/callback`)}`)
}
getSsoInfo()
</script>
<style scoped lang="scss">
.login {
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
</style>
