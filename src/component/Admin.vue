<template>
  <ABody :menu-list="menuListRef" :user="userInfoRef" @userCommand="handleCommand">
    <template #logo>Logo插槽</template>
    <template #copyright>Powered By HoldHope Cloud.</template>
    <template #main>
      <router-view v-slot="{ Component }">
        <Transition appear name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </template>
  </ABody>
</template>
<script lang="ts" setup>
import { Ref, ref } from "vue";
import { ABody } from "@/airpower/component";
import { AirRouterHelper } from "@/airpower/helper/AirRouterHelper";
import { AirMenu } from "@/airpower/model/AirMenu";
import { AirUser } from "@/airpower/model/AirUser";
/* import { AirPlatformConfig } from '@/airpower/dto/AirPlatformConfig'
   import { AirCommonService } from '@/airpower/service/AirCommonService' */
// import { AirOauthService } from '@/airpower/service/AirOauthService'
// import { AirUserEntity } from '@/airpower/dto/AirUserEntity'
// import { AppConfig } from '@/airpower/AppConfig'

async function handleCommand(cmd: string): Promise<void> {
  console.log("User command ", cmd);
}

const userInfoRef: Ref<AirUser | undefined> = ref(),
  /* async function getCurrentUserInfo() {
     const userInfo = await new AirOauthService().getCurrentUserInfo(AirUserEntity)
     console.log('userInfo', userInfo)
     const user = new AirUser()
     user.setId(userInfo.id).setName(userInfo.realName)
     userInfoRef.value = user
   } */

  menuListRef = ref([] as AirMenu[]);

async function getMenuList() {
  /* const menuList = await new AirOauthService().getMenuTreeList()
     console.log('menuList', menuList)
     menuListRef.value = new AirOauthService().getAirMenuListFromEntity(menuList) */

  // TODO 下面的内容开发的时候要删掉
  menuListRef.value = [];
  menuListRef.value.push(
    new AirMenu().setName("首页").setId("1").setPath("/home").setComponent("/index/index")
  );
  menuListRef.value.push(
    new AirMenu()
      .setName("用户管理")
      .setId("2")
      .setPath("/user")
      .setComponent("/user/list")
  );
  menuListRef.value.push(
    new AirMenu()
      .setName("AirHttp")
      .setId("3")
      .setPath("/demo/http")
      .setComponent("/demo/http")
  );
  menuListRef.value.push(
    new AirMenu()
      .setName("高德地图DEMO")
      .setId("4")
      .setPath("/amap/index")
      .setComponent("/amap/index")
  );
  menuListRef.value.push(
    new AirMenu()
      .setName("大件运输监控")
      .setId("5")
      .setPath("/bulkTransportation")
      .setComponent("/bulkTransportation/list")
  );
  // TODO 上面的内容开发的时候要删掉
  AirRouterHelper.initVueRouter(menuListRef.value, "admin");
}

// const platformConfig = ref(new AirPlatformConfig())

/* async function getCurrentTenantLogoConfig() {
     platformConfig.value = await new AirCommonService().getCurrentTenantLogoConfig()
     console.log('platformConfig', platformConfig.value)
   } */

async function init() {
  /* await getCurrentTenantLogoConfig()
     await getCurrentUserInfo() */
  await getMenuList();
  // AppConfig.permissionList = await new AirOauthService().getCurrentUserPermissions()
}

init();
</script>
<style scoped lang="scss">
.logo {
  text-decoration: none;
  color: white;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>
