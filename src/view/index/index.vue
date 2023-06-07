<template>
  <APanel title="首页" description="这是描述信息">
    <template #icon>
      <el-icon>
        <close-bold />
      </el-icon>
    </template>
    <template #body>
      <div v-if="isShowIframe" class="iframe">
        <iframe
          src="http://localhost:8080/#/jtLogin"
          width="100%"
          height="100%" 
          scrolling="auto"
          style="background-color: rgb(15, 17, 25);"
        />
      </div>
      <div>
        {{ world }} <el-button type="primary" @click="doNewWorld()">newWorld</el-button>
        <router-link to="/custom">自定义页面</router-link>|
        <router-link to="/login">登录</router-link>|
        <router-link to="/other">404</router-link>
        <hr>
        <AInput v-model.name="userInfo.name" :entity="UserEntity" @change="change" />
        <br><br>
        <AInput v-model.age="userInfo.age" :entity="UserEntity" />
        <br><br>
        <AInput v-model.userSex="userInfo.userSex" :entity="UserEntity" @change="change" />
        <br><br>
        <AInput v-model.userType="userInfo.userType" :entity="UserEntity" :list="userTypeRecord" />
        <br><br>
        <AInput v-model.userRemark="userInfo.userRemark" :entity="UserEntity" />
        <br><br>
        <AInput v-model.remark="userInfo.remark" :entity="UserEntity" />
        <br><br>
        <AInput v-model.department="userInfo.department" :entity="UserEntity" :tree="departmentTreeData" />
        <br><br>
        <AirImage />
        <br><br>
        <el-button type="primary" @click="test()">打印控制台数据</el-button>
        <br><br>
        <el-button type="primary" @click="upload()">上传文件</el-button>
        <br><br>
        <el-button type="primary" @click="customAlert()">自定义弹窗</el-button>
        <br><br>
        <el-button v-loading="loading" type="primary" @click="getById()">测试Loading</el-button>
        {{ loading }}
        <br><br>
        {{ userInfo }}
      </div>
    </template>
  </APanel>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { APanel, AInput } from '@/airpower/component'
import { AirAlert } from '@/airpower/feedback/AirAlert'
import { AirRecord } from '@/airpower/model/AirRecord'
import { UserEntity, UserType } from '@/entity/UserEntity'
import { UserService } from '@/service/UserService'
import { appStore } from '@/config/store'
import { AirDialogHelper } from '@/airpower/helper'

const isShowIframe = ref(false)
const world = computed(() => appStore().$state.hello)

const doNewWorld = () => {
  appStore().newWorld()
}

const userInfo = ref(new UserEntity())
userInfo.value.userType = UserType.IMPLEMENTER_USER

const userTypeRecord = ref([] as AirRecord[])
userTypeRecord.value.push(new AirRecord().setKey(UserType.IMPLEMENTER_USER)
.setLabel('实施人员'))
userTypeRecord.value.push(new AirRecord().setKey(UserType.ROOT_USER)
.setLabel('超管')
.setDisabled())
userTypeRecord.value.push(new AirRecord().setKey(UserType.OTHER)
.setLabel('其他人员'))

const departmentTreeData = ref([] as AirRecord[])

function initTree(): AirRecord[] {
  const list: AirRecord[] = []
  list.push(new AirRecord().setKey(1)
  .setLabel('测试1'))
  list.push(new AirRecord().setKey(2)
  .setLabel('测试2')
  .setChildren([
    new AirRecord().setKey(21)
    .setLabel('测试21'),
    new AirRecord().setKey(22)
    .setLabel('测试22'),
    new AirRecord().setKey(23)
    .setLabel('测试23')
    .setChildren([
      new AirRecord().setKey(231)
      .setLabel('测试231'),
      new AirRecord().setKey(232)
      .setLabel('测试232'),
    ]),
  ]))
  list.push(new AirRecord().setKey(3)
  .setLabel('测试3')
  .setChildren([
    new AirRecord().setKey(31)
    .setLabel('测试31'),
    new AirRecord().setKey(32)
    .setLabel('测试32')
    .setChildren([
      new AirRecord().setKey(321)
      .setLabel('测试321'),
      new AirRecord().setKey(322)
      .setLabel('测试322'),
    ]),
    new AirRecord().setKey(33)
    .setLabel('测试33')
    .setChildren([
      new AirRecord().setKey(331)
      .setLabel('测试321'),
      new AirRecord().setKey(332)
      .setLabel('测试322'),
    ]),
  ]))
  list.push(new AirRecord().setKey(4)
  .setLabel('测试3'))
  return list
}
departmentTreeData.value = initTree()
function change(data: any) {
  console.log(data)
}
function upload() {
  AirDialogHelper.showUpload()
}

function test() {
  console.log(userInfo.value.toSourceString())
}
const loading = ref(false)
async function getById() {
  await new UserService(loading).getById()
}

async function customAlert() {
  await new AirAlert(`
  <div style="height:500px;overflow:hidden;overflow-y:auto;">
  <h1>Hello</h1><br>
  <div>带我<br/>去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的<br>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  </div>
  `).setTitle('哈哈哈')
  .enableHtml()
  .setWidth(800)
  .show()
  await new AirAlert('带我去好滴哦我去红歌会i哦亲无花果i哦还欠我i哦活该i哦清河湾').setTitle('哈哈哈')
  .success()
}
</script>
<style scoped lang="scss">
.iframe{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
  width: 95%;
  height: 95%;
}
</style>
