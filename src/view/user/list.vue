<template>
  <APanel>
    <template #icon>
      <!-- <el-icon><close-bold /></el-icon> -->
    </template>
    <template #body>
      <AToolBar
        :loading="loadingRef"
        :search-entity="UserEntity"
        search-placeholder="哈哈哈输入点啥"
        :search-request="UserRequestPage"
        show-import
        show-export
        :service="UserService"
        @on-search="onSearch"
        @add="onAddClicked()"
      >
        <template #isVip="search">
          <el-switch v-model="search.data.isVip" /> 这是自定义的
        </template>
        <!-- <template #customButton> 添加 </template> -->
        <!-- <template #customSearch> 自定义搜索 </template> -->
        <!-- <template #toolbarExtend> 扩展 </template> -->
      </AToolBar>
      <ATable
        :data-list="responsePageRef.items"
        :field-list="UserEntity.prototype.getTableFieldConfigList()"
        hide-select
        show-detail
        show-add
        custom-delete
        :table-entity="UserEntity"
        :ctrl-width="130"
        @detail="showDetail($event)"
        @edit="onEdit($event)"
        @delete="onDeleted($event)"
        @add="onRowAdd($event)"
        @sort-change="onSort($event)"
      >
        <template #userSex="row">
          {{
            UserSexRecord.find(({ key }) => key === (row.data as UserEntity).userSex)?.label || "未知"
          }}
        </template>
      </ATable>
    </template>
    <template #footerLeft>
      <ATableToolBar />
    </template>
    <template #footerRight>
      <APage :page-data="responsePageRef" @changed="onPageChanged($event)" />
    </template>
  </APanel>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { APanel, APage, ATable, ATableToolBar, AToolBar } from "@/airpower/component";
import { AirDateTimeHelper, AirDialogHelper, AirRandHelper } from "@/airpower/helper";
import { AirPage } from "@/airpower/dto/AirPage";
import { AirSort } from "@/airpower/dto/AirSort";
import { UserEntity, UserSexRecord, UserType } from "@/entity/UserEntity";
import { UserRequestPage } from "@/model/request/UserRequestPage";
import { UserResponsePage } from "@/model/response/UserResponsePage";
import DialogUserEdit from "./edit.vue";
import DialogUserAdd from "./add.vue";

import showDetail from "./detail";
import { UserService } from "@/service/UserService";

const responsePageRef = ref(new UserResponsePage());
const requestPageRef = ref(new UserRequestPage());
const loadingRef = ref(false);

async function getUserList() {
  loadingRef.value = true;
  const total = 50;
  responsePageRef.value.currentPage = 1;
  responsePageRef.value.currentPageSize = 20;
  responsePageRef.value.total = total;
  responsePageRef.value.items = [];
  for (let i = 1; i < total; i++) {
    const user = new UserEntity();
    user.id = i;
    user.name = `张${i}`;
    user.userRemark = `签名${i}`;
    user.userHead = `头像${i}`;
    user.createdBy = `刘德${i}`;
    user.userSex = i % 2;
    user.createdTime = AirDateTimeHelper.getMilliTimeStamps();
    if (AirRandHelper.getRandNumber(1000, 9999) % 3 === 0) {
      user.userType = UserType.ROOT_USER;
    } else {
      user.userType = UserType.IMPLEMENTER_USER;
    }
    if (AirRandHelper.getRandNumber(1000, 9999) % 3 === 0) {
      user.isVip = true;
    } else {
      user.isVip = false;
    }
    responsePageRef.value.items.push(user);
  }
  console.log(responsePageRef.value);
  loadingRef.value = false;
  console.log(requestPageRef.value.toSourceString());
}

function onSearch(search: UserRequestPage): void {
  requestPageRef.value = search;
  console.log("On Search: ", search.toSourceObject());
}
function onPageChanged(page: AirPage) {
  console.log("page changed", page);
  requestPageRef.value.page = page;
  console.log(requestPageRef.value.toSourceString());
}
function onRowAdd(row: UserEntity) {
  console.log("Row add event", row);
}
function onSort(sort?: AirSort) {
  console.log("sort changed", sort);
  requestPageRef.value.sort = sort;
  console.log(requestPageRef.value.toSourceString());
}
async function onEdit(row: UserEntity) {
  console.log("Edit event", row);
  const result = await AirDialogHelper.show(DialogUserEdit, row);
  console.log("Edit callback", result);
}
function onDeleted(data: UserEntity) {
  console.log("deleted event", data);
}

async function onAddClicked() {
  console.log("open add dialog ");
  await AirDialogHelper.show(DialogUserAdd);
  console.log("add finished");
  // 刷新下数据
  getUserList();
}

getUserList();
</script>
<style scoped lang="scss"></style>
