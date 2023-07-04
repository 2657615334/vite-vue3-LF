<template>
  <APanel>
    <template #body>
      <AToolBar
        :loading="loadingRef"
        :search-entity="BulkTransportationEntity"
        search-placeholder="哈哈哈输入点啥"
        :search-request="BulkTransportationRequestPage"
        show-import
        show-export
        :service="BulkTransportationService"
        @on-search="onSearch"
        @add="onAddClicked()"
      >
        <template #isVip="search">
          <el-switch v-model="search.data.isVip" />
        </template>
      </AToolBar>
      <ATable
        :data-list="responsePageRef.items"
        hide-select
        hide-edit
        hide-delete
        show-detail
        :table-entity="BulkTransportationEntity"
        :ctrl-width="130"
        @detail="showDetail($event)"
      >
      </ATable>
    </template>
    <template #footerRight>
      <APage :page-data="responsePageRef" @changed="onPageChanged($event)" />
    </template>
  </APanel>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { APanel, APage, ATable, AToolBar } from "@/airpower/component";
import { BulkTransportationEntity } from "@/entity/BulkTransportationEntity";
import { BulkTransportationRequestPage } from "@/model/request/BulkTransportationRequestPage";
import { BulkTransportationResponsePage } from "@/model/response/BulkTransportationResponsePage";
import { BulkTransportationService } from "@/service/BulkTransportationService";
import { AirPage } from "@/airpower/dto/AirPage";
const loadingRef = ref(false);
const responsePageRef = ref(new BulkTransportationResponsePage());
const requestPageRef = ref(new BulkTransportationRequestPage());

async function getList() {
  loadingRef.value = true;
  const total = 50;
  responsePageRef.value.currentPage = 1;
  responsePageRef.value.currentPageSize = 20;
  responsePageRef.value.total = total;
  responsePageRef.value.items = [];
  for (let i = 1; i < total; i++) {
    const user = new BulkTransportationEntity();
    user.id = i;
    user.licensePlate = `渝${i}`;
    user.vehicleNature = i % 2;
    user.entranceTollStation = `入口收费站${i}`;
    user.entryTime = Date.now();
    user.highFrequencyTrafficLine = `高频通行线路${i}`;
    user.numberOfTraffic = i;
    user.lawEnforcementUnit = i % 2;
    user.contactNumber = String(i).padStart(11, `${i + 1}`);
    user.latestLocation = `最新位置${i}`;
    user.transitTime = Date.now();
    responsePageRef.value.items.push(user);
  }
  console.log(responsePageRef.value);
  loadingRef.value = false;
}

function onAddClicked() {}
function onSearch(search: BulkTransportationRequestPage): void {
  requestPageRef.value = search;
  console.log("On Search: ", search.toSourceObject());
}
function showDetail(item: BulkTransportationEntity) {
  console.log(item);
}
function onPageChanged(page: AirPage) {
  console.log(page);
  requestPageRef.value.page = page;
}
getList();
</script>

<style lang="scss" scoped></style>
