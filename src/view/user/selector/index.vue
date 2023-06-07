<template>
  <ADialog
    width="70%"
    height="70%"
    :hide-footer="!mult"
    title="请选择用户"
    is-selector
    @on-confirm="onConfirm(selected)"
    @on-cancel="onCancel()"
  >
    <template #body>
      <AToolBar
        hide-add
        :loading="loadingRef"
        :search-entity="UserEntity"
        :search-request="UserRequestPage"
        @on-search="
          requestPageRef = $event;
          getList()"
      />
      <ATable
        :data-list="responsePageRef.items"
        :hide-select="!mult"
        hide-delete
        hide-edit
        :select-list="selectList"
        :entity="UserEntity"
        :ctrl-width="80"
        hide-field-selector
        :hide-ctrl="mult"
        @select="select"
      >
        <template v-if="!mult" #customRow="{ data }">
          <el-button
            size="small"
            type="primary"
            :disabled="data.isDisabled"
            @click="
              onConfirm(data)
            "
          >
            选择
          </el-button>
        </template>
      </ATable>
      <APage
        :page-data="responsePageRef"
        @changed="
          requestPageRef.page = $event;
          getList()
        "
      />
    </template>
    <template #footerLeft>
      <ATableToolBar />
    </template>
    <template #footerRight>
      <APage
        :page-data="responsePageRef"
        @changed="
          requestPageRef.page = $event;
          getList()
        "
      />
    </template>
  </ADialog>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
import { APage, ATableToolBar, ATable, AToolBar, ADialog } from '@/airpower/component'
// import { AirModel } from '@/airpower/model/AirModel'
import { UserEntity } from '@/entity/UserEntity'
import { UserRequestPage } from '@/model/request/UserRequestPage'
import { UserResponsePage } from '@/model/response/UserResponsePage'
import { UserService } from '@/service/UserService'
import { AirAbstractEntity } from '@/airpower/dto/AirAbstractEntity'

defineProps({
  onConfirm: {
    type: Function,
    default: () => null,
  },
  onCancel: {
    type: Function,
    default: () => null,
  },
  mult: {
    type: Boolean,
    default: false,
  },
  selectList: {
    type: Array as PropType<AirAbstractEntity[]>,
    default: () => [] as PropType<AirAbstractEntity[]>,
  },
})

const requestPageRef = ref(new UserRequestPage())
const responsePageRef = ref(new UserResponsePage())
const loadingRef = ref(false)

async function getList() {
  responsePageRef.value = await new UserService(loadingRef).getListData(requestPageRef.value, UserResponsePage)
}
getList()

/** 已选择的数据 */
const selected = ref([] as UserEntity[])

/**
 * 选择事件
 */
function select(list: UserEntity[]) {
  selected.value = list
}
</script>
<style scoped lang="scss">
</style>
