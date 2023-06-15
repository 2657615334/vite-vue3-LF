<template>
  <!-- <div v-loading="true" class="login big-loading" /> -->
  <div class="login_body">
    <div class="form-wrapper">
      <div class="header">login</div>
      <div class="input-wrapper">
        <div class="border-wrapper">
          <el-input
            v-model="userInfo.userName"
            type="text"
            name="username"
            placeholder="username"
            class="border-item"
            autocomplete="off"
          />
        </div>
        <div class="border-wrapper">
          <el-input
            v-model="userInfo.password"
            type="password"
            name="password"
            placeholder="password"
            class="border-item"
            autocomplete="off"
          />
        </div>
      </div>
      <div class="action">
        <div class="btn" @click="login">login</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import { AppConfig } from "./AppConfig";
import { AirUserEntity } from "@/airpower/dto/AirUserEntity";
import router from "@/config/router";
import { ref } from "vue";
import { AirNotification } from "./feedback";
// function getSsoInfo() {
//   // eslint-disable-next-line no-restricted-globals
//   location.replace(
//     `${AppConfig.ssoUrl}login?appId=${AppConfig.appId}&redirectUri=${encodeURIComponent(
//       `${location.origin}/callback`
//     )}`
//   );
// }
// getSsoInfo()
const userInfo = ref(new AirUserEntity());
const login = () => {
  if (userInfo.value.userName && userInfo.value.password) {
    localStorage.setItem("userInfo", JSON.stringify(userInfo.value));
    router.push("/");
  } else {
    new AirNotification().error("请输入账号或密码", "填写内容");
  }
};
</script>
<style scoped lang="scss">
// .login {
//   display: flex;
//   position: fixed;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   flex-direction: column;
//   background: #eee;
//   align-items: center;
//   justify-content: center;
//   font-size: 48px;
//   font-weight: 300;
//   color: #999;
// }
.login_body {
  height: 100vh;
  font-family: JetBrains Mono Medium;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("./assets/img/loginBg.png") no-repeat;
  background-size: 100% 100%;
}

.form-wrapper {
  width: 300px;
  background-color: rgba(41, 45, 62, 0.8);
  color: #fff;
  border-radius: 2px;
  padding: 50px;
}

.form-wrapper .header {
  text-align: center;
  font-size: 35px;
  text-transform: uppercase;
  line-height: 100px;
}

.form-wrapper .input-wrapper .el-input {
  background-color: rgb(41, 45, 62);
  border: 0;
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: #fff;
  outline: none;
  :deep(.el-input__wrapper) {
    background-color: transparent;
    box-shadow: none;
    .el-input__inner {
      color: #fff !important;
    }
  }
}

.form-wrapper .input-wrapper input::placeholder {
  text-transform: uppercase;
}

.form-wrapper .input-wrapper .border-wrapper {
  background-image: linear-gradient(to right, #e8198b, #0eb4dd);
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-wrapper .input-wrapper .border-wrapper .border-item {
  height: calc(100% - 4px);
  width: calc(100% - 4px);
  border-radius: 30px;
}

.form-wrapper .action {
  display: flex;
  justify-content: center;
}

.form-wrapper .action .btn {
  width: 60%;
  text-transform: uppercase;
  border: 2px solid #0e92b3;
  text-align: center;
  line-height: 50px;
  border-radius: 30px;
  cursor: pointer;
}

.form-wrapper .action .btn:hover {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}

.form-wrapper .icon-wrapper {
  text-align: center;
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
  border-top: 1px dashed rgb(146, 146, 146);
  padding: 20px;
}

.form-wrapper .icon-wrapper i {
  font-size: 20px;
  color: rgb(187, 187, 187);
  cursor: pointer;
  border: 1px solid #fff;
  padding: 5px;
  border-radius: 20px;
}

.form-wrapper .icon-wrapper i:hover {
  background-color: #0e92b3;
}
</style>
