<template>
  <div class="airpower">
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { AppConfig } from "./AppConfig";

const router = useRouter();

router.beforeEach((to, _, next) => {
  if (!["/callback", "/login"].includes(to.path)) {
    AppConfig.setLastPath(to.path);
  }
  next();
});
router.afterEach(() => {
  window.scrollTo(0, 0);
});

const airpowerInit = () => {
  if (!AppConfig.appId) {
    // eslint-disable-next-line no-alert
    window.alert("请在main.ts中配置 AppConfig.appId (找后端要)");
  }
  if (!AppConfig.router) {
    // eslint-disable-next-line no-alert
    window.alert("请在main.ts中配置 AppConfig.router");
  }
};
airpowerInit();
</script>
<style scoped lang="scss"></style>
