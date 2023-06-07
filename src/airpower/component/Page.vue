<template>
  <el-pagination
    v-model:currentPage="currentProps.pageData.currentPage"
    v-model:page-size="currentProps.pageData.currentPageSize"
    background
    :pager-count="5"
    :page-sizes="pageSizes"
    layout="total, sizes, prev, pager, next, jumper"
    :total="currentProps.pageData.total"
    @size-change="sizeChanged($event)"
    @current-change="pageChanged($event)"
  />
</template>

<script lang="ts" setup="props">
import { PropType, reactive } from 'vue'
import { AppConfig } from '../AppConfig'
import { AirBaseResponsePage } from '../dto/AirBaseResponsePage'
import { AirPage } from '../dto/AirPage'

const props = defineProps({
  /** 
   * # 😄AirPage对象
   */
  pageData: {
    type: AirBaseResponsePage,
    default: new AirBaseResponsePage(),
  },
  /**
   * # 😄可选页码值
   * 默认使用 ```AppConfig.defaultPageSizes``` 的全局配置
   */
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => AppConfig.defaultPageSizes,
  },
})

// eslint-disable-next-line no-unused-vars
const emits = defineEmits<{(event: 'changed', pageData: AirPage): void;
  // eslint-disable-next-line no-unused-vars
  (event: 'onChange', pageData: AirPage): void;
}>()

/**
 * # 传入的数据
 */
const currentProps = reactive(props)

/**
 * # 页码变更
 */
function pageChanged(num: number): void {
  currentProps.pageData.currentPage = num
  const page = new AirPage()
  if (currentProps.pageData.currentPage) {
    page.currentPage = currentProps.pageData.currentPage
  }
  if (currentProps.pageData.currentPageSize) {
    page.currentPageSize = currentProps.pageData.currentPageSize
  }
  emits('onChange', page)
  emits('changed', page)
}

/**
 * # 每页数量变更
 */
function sizeChanged(size: number): void {
  currentProps.pageData.currentPage = 1
  currentProps.pageData.currentPageSize = size
  const page = new AirPage()
  if (currentProps.pageData.currentPage) {
    page.currentPage = currentProps.pageData.currentPage
  }
  if (currentProps.pageData.currentPageSize) {
    page.currentPageSize = currentProps.pageData.currentPageSize
  }
  emits('onChange', page)
  emits('changed', page)
}

</script>

<style scoped lang="scss">

</style>
