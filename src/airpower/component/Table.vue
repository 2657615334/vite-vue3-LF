<template>
  <div class="air-table-container" :style="{ height: autoHeight ? 'auto' : '0px' }">
    <div class="air-table-tool-bar">
      <slot name="addButton" />
    </div>
    <el-table
      v-if="allFieldList"
      :id="tableId"
      ref="airTableRef"
      class="air-table"
      :row-key="(row: any) => row.id"
      :lazy="lazy"
      :load="load"
      :default-expand-all="defaultExpandAll"
      :tree-props="treeProps"
      :data="showDataList"
      :span-method="spanMethod"
      height="100%"
      @select="selectChanged"
      @select-all="selectChanged"
      @sort-change="sortChanged"
    >
      <el-table-column
        v-if="!hideSelect"
        type="selection"
        width="40"
        fixed="left"
        :reserve-selection="true"
      />
      <el-table-column
        v-if="!hideIndex"
        type="index"
        label="序号"
        fixed="left"
        width="60"
      />
      <!-- 文本数据渲染 -->
      <template v-for="item in allFieldList" :key="item.key">
        <el-table-column
          v-if="isSelected(item)"
          :prop="item.key"
          :label="item.label"
          :width="item.width || 'auto'"
          :min-width="item.minWidth || 'auto'"
          :fixed="item.fixed"
          :sortable="item.sortable"
          :align="item.align"
        >
          <template #default="scope">
            <!-- 支持自定义插槽 -->
            <slot :name="item.key" :data="scope.row" :index="scope.$index">
              <template v-if="item.key">
                <!-- 自动读取枚举 -->
                <div v-if="item.enumRecord" class="status">
                  <!-- 显示状态灯 -->
                  <span
                    v-if="item.showStatus"
                    class="light"
                    :style="{
                      backgroundColor:
                        item.enumRecord.find((_: any) =>
                          item.key && _.key === scope.row[item.key]
                        )?.color || AirColor.NORMAL
                    }"
                  />
                  <span
                    :style="{
                      color:
                        item.enumRecord.find((_: any) =>
                          item.key && _.key === scope.row[item.key]
                        )?.color || AirColor.NORMAL
                    }"
                  >
                    {{ item.enumRecord.find((_: any) => item.key && _.key === scope.row[item.key])?.label || "-" }}
                  </span>
                </div>
                <!-- 自动时间日期格式化 -->
                <template v-else-if="item.dateTimeFormatter">
                  <ADateTime
                    :time="scope.row[item.key]"
                    :formatter="item.dateTimeFormatter"
                    :is-friendly="item.isFriendlyDateTime"
                  />
                </template>
                <!-- 图片字段 -->
                <template v-else-if="item.isImage">
                  <el-image
                    style="background-color: #f3f6f9"
                    :style="{
                      width: item.imageWidth + 'px',
                      height: item.imageHeight + 'px',
                    }"
                    lazy
                    :src="AirFileHelper.getStaticFileUrl(scope.row[item.key])"
                    :preview-src-list="[
                      AirFileHelper.getStaticFileUrl(scope.row[item.key]),
                    ]"
                    :z-index="999999"
                    preview-teleported
                    fit="contain"
                  >
                    <template #error>
                      <div class="image-error">暂无</div>
                    </template>
                  </el-image>
                </template>
                <!-- 读取挂载数据 -->
                <template v-else-if="item.payloadField">
                  <template v-if="item.isCopyField">
                    <ACopy
                      :content="
                        scope.row[item.key] ? scope.row[item.key][item.payloadField] : '-'
                      "
                    >
                      {{
                        scope.row[item.key] ? scope.row[item.key][item.payloadField] : "-"
                      }}
                    </ACopy>
                  </template>
                  <template v-else>{{
                    scope.row[item.key] ? scope.row[item.key][item.payloadField] : "-"
                  }}</template>
                </template>
                <!-- 通用字段 -->
                <template v-else>
                  <template v-if="item.isCopyField">
                    <ACopy :content="scope.row[item.key]">
                      {{ scope.row[item.key] }}
                    </ACopy>
                  </template>
                  <template v-else>{{ scope.row[item.key] }}</template>
                </template>
                <span v-if="item.suffixText" style="color: #aaa">{{
                  item.suffixText
                }}</span>
              </template>
            </slot>
          </template>
        </el-table-column>
      </template>
      <!-- 如果没有隐藏操作列 或者字段选择器启用 -->
      <el-table-column
        v-if="!hideCtrl || isFieldSelectorEnabled"
        fixed="right"
        align="right"
        :width="ctrlWidth || 'auto'"
      >
        <template #header>
          <div class="custom-header">
            <span v-if="!hideCtrl" class="custom-header-title">操作</span>
            <template v-if="isFieldSelectorEnabled">
              <el-tooltip effect="customized" content="配置列字段" placement="top">
                <i class="airpower icon-commonicon_ziduankongzhi">
                  <el-select
                    v-model="selectedFieldList"
                    multiple
                    collapse-tags
                    popper-class="field-selector"
                  >
                    <el-option disabled value="" label="请选择需要显示的字段" />
                    <el-option
                      v-for="field in allFieldList"
                      :key="field.key"
                      :label="field.label"
                      :value="field.key"
                      :disabled="field.forceShow"
                    />
                  </el-select>
                </i>
              </el-tooltip>
            </template>
          </div>
        </template>
        <template #default="scope">
          <div class="ctrlRow">
            <!-- 自定义操作列前置插槽 -->
            <slot name="customRow" :data="scope.row" :index="scope.$index" />
            <template v-if="!hideCtrl">
              <AButton
                v-if="showAdd"
                icon-button
                type="ADD"
                tooltip="添加"
                :permission="addPermission || entityConfig.addChildPermission"
                @click="handleAdd(scope.row)"
              />
              <AButton
                v-if="!hideEdit"
                icon-button
                type="EDIT"
                tooltip="编辑"
                :permission="editPermission || entityConfig.editPermission"
                @click="handleEdit(scope.row)"
              />
              <AButton
                v-if="showDetail"
                icon-button
                type="DETAIL"
                tooltip="查看详情"
                :permission="detailPermission || entityConfig.detailPermission"
                @click="handleDetail(scope.row)"
              />
              <AButton
                v-if="!hideDelete"
                icon-button
                type="DELETE"
                tooltip="删除"
                danger
                :permission="deletePermission || entityConfig.deletePermission"
                @click="handleDelete(scope.row)"
              />
            </template>
            <!-- 自定义操作列后置插槽 -->
            <slot name="endRow" :data="scope.row" :index="scope.$index" />
          </div>
        </template>
      </el-table-column>
      <template #empty>
        <img src="../assets/img/empty.svg" />
        <div>{{ emptyText || entityConfig.tableEmptyText || "暂无数据" }}</div>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType, watch, nextTick, computed } from "vue";
import { ClassConstructor } from "class-transformer";
import { getClassName } from "../decorator/CustomName";
import { getEntityConfig } from "../decorator/EntityConfig";
import { AirSortType } from "../enum/AirSortType";
import { AirConfirm } from "../feedback/AirConfirm";
import { ITreeProps } from "../interface/ITreeProps";
import { AirAbstractEntity } from "../dto/AirAbstractEntity";
import { AirEntityConfig } from "../config/AirEntityConfig";
import { AirTableFieldConfig } from "../config/AirTableFieldConfig";
import { AirTableInstance } from "../type/AirType";
import { AirColor } from "../enum/AirColor";
import { AirFileHelper } from "../helper/AirFileHelper";
import { AirSort } from "../dto/AirSort";
import { ADateTime, ACopy, AButton } from ".";

const props = defineProps({
  /**
   * # 😄行尾编辑按钮的权限标识
   * 如不传入 则默认使用 ```EntityConfig``` 的 ```editPermission``` 配置
   */
  editPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 😄行尾详情按钮的权限标识
   * 如不传入 则默认使用 ```EntityConfig``` 的 ```detailPermission``` 配置
   */
  detailPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 😄行尾删除按钮的权限标识
   * 如不传入 则默认使用 ```EntityConfig``` 的 ```deletePermission``` 配置
   */
  deletePermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 😄行尾添加按钮的权限标识
   * 如不传入 则默认使用 ```EntityConfig``` 的 ```addChildPermission``` 配置
   */
  addPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 😄表格显示的数据数组
   */
  dataList: {
    type: Array as PropType<AirAbstractEntity[]>,
    default: () => [] as PropType<AirAbstractEntity[]>,
  },

  /**
   * # 😡已弃用 请直接使用```:dataList```😡
   * @deprecated
   */
  data: {
    type: Array as PropType<AirAbstractEntity[]>,
    default: () => [] as PropType<AirAbstractEntity[]>,
  },

  /**
   * # 😄默认选中的数据数组
   */
  selectList: {
    type: Array as PropType<AirAbstractEntity[]>,
    default: () => [] as PropType<AirAbstractEntity[]>,
  },

  /**
   * # 😄显示字段列表
   * 如传入 则优先使用
   */
  fieldList: {
    type: Array as PropType<AirTableFieldConfig[]>,
    default: () => [],
  },

  /**
   * # 😄默认表格空文案
   * 如不传入 则默认使用 ```EntityConfig``` 的 ```tableEmptyText``` 配置
   */
  emptyText: {
    type: String,
    default: undefined,
  },

  /**
   * # 😄是否隐藏编辑按钮
   */
  hideEdit: {
    type: Boolean,
    default: false,
  },

  /**
   * # 😄是否隐藏删除按钮
   */
  hideDelete: {
    type: Boolean,
    default: false,
  },

  /**
   * # 😄是否隐藏多选框
   */
  hideSelect: {
    type: Boolean,
    default: false,
  },

  /**
   * # 😄是否隐藏序号
   */
  hideIndex: {
    type: Boolean,
    default: false,
  },

  /**
   * # 😄是否隐藏字段选择
   * 如 ```EntityConfig``` 的 ```hideFieldSelector``` 设置为 ```true```, 则此项失效
   */
  hideFieldSelector: {
    type: Boolean,
    default: false,
  },

  /**
   * # 😄操作区宽度
   */
  ctrlWidth: {
    type: Number,
    default: 0,
  },

  /**
   * # 😄自动撑起高度
   * 默认fix滚动
   */
  autoHeight: {
    type: Boolean,
    default: false,
  },

  /**
   * # 😄是否隐藏操作按钮
   */
  hideCtrl: Boolean,

  /**
   * # 😄是否显示详情按钮
   */
  showDetail: Boolean,

  /**
   * # 😄是否显示添加按钮
   */
  showAdd: Boolean,

  /**
   * # 😄是否自定义删除事件
   */
  customDelete: Boolean,

  /**
   * # 😄是否懒加载
   */
  lazy: Boolean,

  /**
   * # 😄删除确认框提示标题
   */
  deleteTitle: {
    type: String,
    default: "",
  },

  /**
   * # 😄删除确认框提示内容
   */
  deleteContent: {
    type: String,
    default: "",
  },

  /**
   * # 😡已弃用 请直接使用```:entity```😡
   * @deprecated
   */
  tableEntity: {
    type: (Function as unknown) as PropType<ClassConstructor<AirAbstractEntity>>,
    default: null,
  },

  /**
   * # 😄表格绑定的数据实体
   */
  entity: {
    type: (Function as unknown) as PropType<ClassConstructor<AirAbstractEntity>>,
    default: undefined,
  },

  /**
   * # 😄树结构的标准配置
   */
  treeProps: {
    type: Object as PropType<ITreeProps>,
    default: () => ({}),
  },

  /**
   * # 😄懒加载的方法注入
   */
  load: {
    type: Function,
    default: null,
  },

  /**
   * # 😄是否展开树的所有项目
   */
  defaultExpandAll: {
    type: Boolean,
    default: true,
  },

  /**
   * # 合并行、列的方法
   * 方法的参数是一个对象，里面包含当前行 row、当前列 column、当前行号 rowIndex、当前列号 columnIndex 四个属性。
   */
  spanMethod: {
    type: Function,
    default: () => {},
  },
});

/**
 * 兼容使用 data 传入数据
 * 这里是个刚填上的大坑
 */
const showDataList = computed(() => {
  if (props.dataList.length > 0) {
    return props.dataList;
  }
  if (props.data.length > 0) {
    return props.data;
  }
  return [];
});

/**
 * 选择的字段
 */
const selectedFieldList = ref([] as string[]);

/**
 * 内部使用的entity
 */
let tableBindEntity: ClassConstructor<AirAbstractEntity> | null = null;
/**
 * 内部使用的配置
 */
let entityConfig: AirEntityConfig = new AirEntityConfig();

/**
 * 字段选择器是否启用
 */
const isFieldSelectorEnabled = computed(() => {
  if (entityConfig.hideFieldSelector) {
    // 全局标记了隐藏
    return false;
  }
  // 读取传入配置是否隐藏
  return !props.hideFieldSelector;
});

/**
 * 更新已选字段
 */
function updateSelectedFieldList() {
  selectedFieldList.value = [];
  // eslint-disable-next-line no-use-before-define
  selectedFieldList.value = (allFieldList.value || [])
    .filter((item) => !item.removed && !item.hide)
    .map((item) => item.key || "");
}

/**
 * 所有的字段
 */
const allFieldList = computed(() => {
  // 如果传入fieldList 优先使用fieldList
  if (props.fieldList.length > 0) {
    // 过滤没有隐藏且没有移除的列
    return props.fieldList.filter((item) => !item.removed);
  }
  if (tableBindEntity) {
    // 如果传入了Table实体
    return (tableBindEntity.prototype as AirAbstractEntity)
      .getTableFieldConfigList()
      .filter((item) => !item.removed);
  }
  return [];
});

// 初始化
function init() {
  tableBindEntity = props.entity || props.tableEntity || null;
  if (tableBindEntity) {
    entityConfig = getEntityConfig(tableBindEntity);
  }
  // 初始更新
  updateSelectedFieldList();
}
init();

// 监听列表变化
watch(
  () => props.fieldList,
  () => {
    updateSelectedFieldList();
  }
);

/**
 * 字段是否选择
 */
function isSelected(item: AirTableFieldConfig) {
  if (!item.key) {
    return false;
  }
  return selectedFieldList.value.indexOf(item.key) >= 0;
}

/**
 * 定义事件
 */
// eslint-disable-next-line no-unused-vars
const emits = defineEmits<{
  (event: "detail", data: any): void;
  // eslint-disable-next-line no-unused-vars
  (event: "onDetail", data: any): void;
  // eslint-disable-next-line no-unused-vars
  (event: "delete", data: any): void;
  // eslint-disable-next-line no-unused-vars
  (event: "onDelete", data: any): void;
  // eslint-disable-next-line no-unused-vars
  (event: "edit", data: any): void;
  // eslint-disable-next-line no-unused-vars
  (event: "onEdit", data: any): void;
  // eslint-disable-next-line no-unused-vars
  (event: "select", data: any): void;
  // eslint-disable-next-line no-unused-vars
  (event: "onSelect", data: any): void;
  // eslint-disable-next-line no-unused-vars
  (event: "add", data: any): void;
  // eslint-disable-next-line no-unused-vars
  (event: "onAdd", data: any): void;
  // eslint-disable-next-line no-unused-vars
  (event: "sortChange", data?: AirSort): void;
  // eslint-disable-next-line no-unused-vars
  (event: "onSortChange", data?: AirSort): void;
}>();

/**
 * 表格dom
 */
const airTableRef = ref<AirTableInstance>();

/**
 * Table的ID
 */
const tableId = `tb_${Math.floor(Math.random() * 1000)}`;

/**
 * 回显选中
 */
function toggleSelection() {
  if (airTableRef.value) {
    airTableRef.value.clearSelection();
  }
  for (const row of props.dataList) {
    for (const selectedRow of props.selectList) {
      if (
        (selectedRow as AirAbstractEntity).id === (row as AirAbstractEntity).id &&
        airTableRef.value
      ) {
        airTableRef.value.toggleRowSelection(row, true);
        continue;
      }
    }
  }
}

/**
 * 监听传入数据变化
 */
watch(
  () => props.dataList,
  () => {
    nextTick(() => {
      toggleSelection();

      // 分页后滚动条置顶
      const table = document.querySelector(`#${tableId}`);
      const bodyWrapp = table?.querySelector(".el-scrollbar__wrap") as HTMLElement;
      bodyWrapp.scrollTop = 0;
    });
  }
);

/**
 * 监听选择的数组列表
 */
watch(
  () => props.selectList,
  () => {
    nextTick(() => {
      toggleSelection();
    });
  }
);

/**
 * 添加按钮点击事件
 * @param item 行数据
 */
function handleAdd(item: any) {
  emits("onAdd", item);
  emits("add", item);
}

/**
 * 详情按钮点击事件
 * @param item 详情数据
 */
function handleDetail(item: any) {
  emits("onDetail", item);
  emits("detail", item);
}

/**
 * 编辑按钮点击事件
 * @param item 编辑的数据
 */
function handleEdit(item: any) {
  emits("onEdit", item);
  emits("edit", item);
}

/**
 * 单个删除 单个删除
 * @param item
 */
async function handleDelete(item: any) {
  if (props.customDelete) {
    emits("onDelete", item);
    emits("delete", item);
    return;
  }
  try {
    let title = "删除提醒";
    let content = "是否确认删除当前选中的数据？";
    // 如果实体传入 则尝试自动获取
    if (tableBindEntity) {
      const entityName = getClassName(tableBindEntity);
      title = `删除${entityName}提醒`;
      content = `是否确认删除当前选中的${entityName}？`;
    }
    // 如果传入配置项 则覆盖实体标注的内容
    if (props.deleteTitle) {
      title = props.deleteTitle;
    }
    if (props.deleteContent) {
      content = props.deleteContent;
    }
    await new AirConfirm()
      .setTitle(title)
      .setContent(content)
      .setConfirmText("确定")
      .setCancelText("取消")
      .warning();
    emits("onDelete", item);
    emits("delete", item);
  } catch (e) {
    // 取消删除
  }
}

/**
 * 选中事件
 * @param list 选中的列表
 */
function selectChanged(list: any) {
  // 保持其他页码数据的选中状态，因为list只会返回当前页选中数据
  const otherPage = (props.selectList || []).filter(
    (item) =>
      props.dataList?.findIndex((data) => (data as any).id === (item as any).id) === -1
  );
  const selectAll = list.concat(otherPage);
  emits("onSelect", selectAll);
  emits("select", selectAll);
}

/**
 * 排序事件
 * @param data
 */
function sortChanged(data: { prop: string; order: string }) {
  if (data.prop) {
    const sort = new AirSort();
    sort.columnName = data.prop;
    sort.sortType = data.order === "descending" ? AirSortType.DESC : AirSortType.ASC;
    emits("sortChange", sort);
    emits("onSortChange", sort);
  } else {
    emits("onSortChange", undefined);
    emits("sortChange", undefined);
  }
}
</script>

<style lang="scss">
.ctrlRow {
  display: flex;

  .el-link.is-underline:hover:after {
    border-bottom: none;
  }

  .el-link {
    font-size: 16px;
    padding: 0 5px;
  }

  .el-link:not(.el-link--danger) {
    --el-link-text-color: var(--label-color);
  }
}

.ctrlRow + .el-button {
  margin-left: 12px;
}

.air-table-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 300px;

  .image-error {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 12px;
    text-align: center;
    background-color: #f3f6f9;
    color: #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.air-table-tool-bar > * {
  margin-bottom: 10px;
}

.air-table {
  flex: 1;
  height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .el-table__placeholder {
    display: none;
  }

  .el-table__indent {
    margin-right: 5px;
  }

  .el-table__empty-text {
    line-height: 40px;
  }

  .el-table__header-wrapper {
    background-color: #f3f3f5;

    th {
      background-color: #f3f3f5 !important;
    }
  }

  .el-table__body-wrapper {
    flex: 1;
    height: 0;
    overflow: hidden;
    overflow-y: auto;

    .el-scrollbar__view {
      height: 100%;
    }
  }

  .custom-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    .custom-header-title {
      flex: 1;
      text-align: left;
    }

    .airpower {
      font-size: 16px;
      transition: all 0.3s;
      cursor: pointer;
      overflow: hidden;
      position: relative;

      .el-select {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        opacity: 0;
      }
    }

    .el-icon:hover {
      color: var(--primary-color);
    }
  }

  .status {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .light {
    width: 6px;
    height: 6px;
    border-radius: 100%;
    display: inline-block;
    margin-right: 6px;
    margin-top: -1px;
  }

  .row-delete {
    color: var(--el-color-error);
  }

  .field-selector {
    span {
      padding-right: 60px;
    }

    .el-select-dropdown__item.selected::after {
      width: 16px !important;
      height: 16px !important;
    }
  }
}
</style>
