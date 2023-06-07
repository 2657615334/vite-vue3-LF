<template>
  <template v-if="fieldConfig && fieldConfig.dateType !== undefined">
    <el-date-picker
      v-if="fieldConfig.dateType !== AirDateTimeType.TIME"
      v-model="value"
      :placeholder="placeholderRef"
      :clearable="fieldConfig?.clearable"
      :disabled="disabled || fieldConfig?.disabled"
      :prefix-icon="fieldConfig?.prefixIcon"
      :suffix-icon="fieldConfig?.suffixIcon"
      :format="fieldConfig.dateShowFormatter || getShowFormatter"
      :value-format="fieldConfig.dateValueFormatter"
      :type="fieldConfig.dateType"
      @change="selectEvent"
      @visible-change="selectEvent"
    />
    <el-time-picker
      v-else
      v-model="value"
      :placeholder="placeholderRef"
      :clearable="fieldConfig?.clearable"
      :disabled="disabled || fieldConfig?.disabled"
      :prefix-icon="fieldConfig?.prefixIcon"
      :suffix-icon="fieldConfig?.suffixIcon"
      :format="fieldConfig.dateShowFormatter || AirDateTimeFormatter.HH_mm_ss"
      :value-format="fieldConfig.dateValueFormatter"
      @change="selectEvent"
      @visible-change="selectEvent"
    />
  </template>
  <template v-else-if="fieldConfig && fieldConfig.enumRecord || list">
    <el-switch
      v-if="fieldConfig?.isSwitch"
      v-model="value"
      :style="{ '--el-switch-on-color': getSwitchColor('on'), '--el-switch-off-color': getSwitchColor('off') }"
      :active-text="!fieldConfig.hideSwitchLabel && fieldConfig?.enumRecord?.find(item => item.key === true)?.label || ''"
      :inactive-text="!fieldConfig.hideSwitchLabel && fieldConfig?.enumRecord?.find(item => item.key === false)?.label || ''"
      @change="selectEvent"
    />
    <el-radio-group v-else-if="fieldConfig?.isRadioButton" v-model="value" @change="selectEvent">
      <template v-if="list">
        <el-radio-button v-for="item in list" :key="item.key" :label="item.key">
          {{ item.label }}
        </el-radio-button>
      </template>
      <template v-else>
        <el-radio-button v-for="item in fieldConfig.enumRecord" :key="item.key" :label="item.key">
          {{ item.label }}
        </el-radio-button>
      </template>
    </el-radio-group>
    <el-radio-group v-else-if="fieldConfig?.isRadio" v-model="value" @change="selectEvent">
      <template v-if="list">
        <el-radio v-for="item in list" :key="item.key" :label="item.key">
          {{ item.label }}
        </el-radio>
      </template>
      <template v-else>
        <el-radio v-for="item in fieldConfig.enumRecord" :key="item.key" :label="item.key">
          {{ item.label }}
        </el-radio>
      </template>
    </el-radio-group>
    <el-select
      v-else
      v-model="value"
      :placeholder="placeholderRef"
      :clearable="fieldConfig?.clearable"
      :disabled="disabled || fieldConfig?.disabled"
      :prefix-icon="fieldConfig?.prefixIcon"
      :suffix-icon="fieldConfig?.suffixIcon"
      :multiple="fieldConfig?.multiple"
      :multiple-limit="fieldConfig?.multipleLimit"
      fit-input-width
      :collapse-tags="fieldConfig?.collapseTags"
      collapse-tags-tooltip
      @change="selectEvent"
    >
      <template v-if="list">
        <el-option
          v-for="item in list"
          :key="(item.key as string)"
          :label="item.label"
          :value="item.key"
          :disabled="item.disabled"
        />
      </template>
      <template v-else-if="fieldConfig">
        <el-option
          v-for="item in fieldConfig.enumRecord"
          :key="(item.key as string)"
          :label="item.label"
          :value="item.key"
          :disabled="item.disabled"
        />
      </template>
    </el-select>
  </template>

  <el-cascader
    v-else-if="(fieldConfig && tree)"
    v-model="value"
    class="air-input-cascader"
    :options="tree"
    popper-class="air-input-cascader-popper"
    :placeholder="placeholderRef"
    :clearable="fieldConfig?.clearable"
    :show-all-levels="fieldConfig?.showAllLevels"
    :props="{
      value: 'key',
      multiple: fieldConfig?.multiple,
      emitPath: fieldConfig?.emitPath,
      checkStrictly: fieldConfig?.checkStrictly
    }"
    :disabled="disabled || fieldConfig?.disabled"
    :collapse-tags="fieldConfig?.collapseTags"
    collapse-tags-tooltip
    @change="selectEvent"
  />
  <el-input
    v-else
    v-model="value"
    :placeholder="placeholderRef"
    :clearable="fieldConfig?.clearable"
    :disabled="disabled || fieldConfig?.disabled"
    :maxlength="fieldConfig?.maxLength || (fieldConfig?.isTextarea ? AppConfig.maxTextAreaLength : AppConfig.maxTextLength)"
    :max="fieldConfig?.max"
    :min="fieldConfig?.min || 0"
    :show-word-limit="getShowWordLimit()"
    :type="getInputType"
    :rows="fieldConfig?.isTextarea ? AppConfig.defaultTextareaMinRows : 0"
    :prefix-icon="fieldConfig?.prefixIcon"
    :suffix-icon="fieldConfig?.suffixIcon"
    :autosize="fieldConfig?.autoSize ? { minRows: fieldConfig.minRows, maxRows: fieldConfig.maxRows } : false"
    @keydown="inputKeyDown"
    @change="inputEvent"
    @blur="inputEvent"
  >
    <template v-if="fieldConfig && fieldConfig.suffixText" #append>
      <slot name="append">{{ fieldConfig?.suffixText }}</slot>
    </template>
    <template #suffix>
      <el-icon v-if="isClearButtonShow" @click="emits('clear')">
        <CircleClose />
      </el-icon>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { PropType, Ref, ref, watch, computed } from 'vue'
import { ClassConstructor } from 'class-transformer'
import { AirModel } from '../model/AirModel'
import { AirFormFieldConfig } from '../config/AirFormFieldConfig'
import { AppConfig } from '../AppConfig'
import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { AirDateTimeType } from '../enum/AirDateTimeType'
import { IRecord } from '../interface/IRecord'
import { AirValidatorHelper } from '../helper/AirValidatorHelper'

const props = defineProps({
  modelValue: {
    type: [String, Boolean, Number, Array, Object],
    default: undefined,
  },
  modelModifiers: {
    type: Object,
    default: () => ({}),
  },

  /**
   * # 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * # 禁用时显示的值
   * 如果被禁用时传入了这个值, 则会显示这个值.
   */
  disabledValue: {
    type: [String, Boolean, Number, Array, Object],
    default: undefined,
  },

  /**
   * # 显示的格式化方式
   */
  dateShowFormatter: {
    type: String,
    default: undefined,
  },

  /**
   * # 传入的实体
   */
  entity: {
    type: Function as unknown as PropType<ClassConstructor<AirModel>>,
    default: undefined,
  },

  /**
   * # 自定义提示文字
   */
  placeholder: {
    type: String, default: '',
  },

  /**
   * # 传入了数组
   */
  list: {
    type: Object as unknown as PropType<IRecord[]>,
    default: undefined,
  },

  /**
   * # 传入了树
   */
  tree: {
    type: Object as unknown as PropType<IRecord[]>,
    default: undefined,
  },

  /**
   * # 是否显示清空的图标
   * 仅在普通输入框的readonly下有效
   */
  showClear: {
    type: Boolean,
    default: false,
  },
})

const isClearButtonShow = ref(props.showClear)

/**
 * 传入的占位内容
 */
const placeholderRef = ref(props.placeholder)
/**
 * 绑定的数据
 */
const value: Ref<string | number | boolean | Array<any> | Record<string, any> | undefined> = ref(props.modelValue)

/**
 * 字段的表单配置信息
 */
const fieldConfig: Ref<AirFormFieldConfig | null> = ref(null)

/**
 * 值变化同步
 */
function setValue(newProps?: typeof props) {
  if (newProps) {
    if (newProps.disabled || fieldConfig.value?.disabled) {
      // disabled
      value.value = newProps.disabledValue === undefined ? newProps.modelValue : newProps.disabledValue
    } else {
      value.value = newProps.modelValue
    }
  } else {
    value.value = props.modelValue
  }
}

const fieldName = ref('')
for (const key in props.modelModifiers) {
  fieldName.value = key
}

/**
 * # 获取显示的格式化
 */
const getShowFormatter = computed(() => {
  if (fieldConfig.value) {
    switch (fieldConfig.value?.dateType) {
      case AirDateTimeType.DATE:
        return AirDateTimeFormatter.YYYY_MM_DD
      case AirDateTimeType.WEEK:
        return '第ww周'
      case AirDateTimeType.YEAR:
        return 'YYYY'
      case AirDateTimeType.MONTH:
        return 'YYYY-MM'
      default:
    }
  }
  return AppConfig.defaultDateTimeFormatter
})

/**
 * # 获取switch的颜色
 * @param status 
 */
function getSwitchColor(status: 'on' | 'off') {
  if (fieldConfig.value?.disableSwitchColor) {
    return ''
  }
  return fieldConfig.value?.enumRecord?.find(item => item.key === (status === 'on'))?.color || ''
}

/**
 * # 获取是否显示字符长度的显示label
 */
function getShowWordLimit() {
  if (!fieldConfig.value) {
    // 没有配置装饰器 直接不显示
    return false
  }
  if (fieldConfig.value.showLimit !== undefined) {
    // 配置了装饰器 且配置了属性 直接返回
    return fieldConfig.value.showLimit
  }
  // 配置了装饰器 但没配置属性 读取默认值
  return fieldConfig.value.isTextarea ? AppConfig.defaultTextAreaShowLimit : AppConfig.defaultInputShowLimit
}

/**
 * 获取输入类型的字符串
 */
const getInputType = computed(() => {
  if (fieldConfig.value?.isTextarea) {
    return 'textarea'
  }
  if (fieldConfig.value?.isPassword) {
    return 'password'
  }
  if (fieldConfig.value?.isNumber) {
    return 'number'
  }
  return 'text'
})

/**
 * 监听Props变化, 同步数据
 */
watch(props, (newProps) => {
  isClearButtonShow.value = props.showClear
  setValue(newProps)
})

/**
 * 声明回调
 */
const emits = defineEmits(['onChange', 'change', 'update:modelValue', 'clear'])

/**
 * 输入键盘按下事件
 * @param event 
 */
function inputKeyDown(event: KeyboardEvent) {
  if (fieldConfig.value?.isNumber && event.code === 'KeyE') {
    // 数字类型输入不允许输入科学计数的e
    event.preventDefault()
  }
}

/**
 * 输入事件
 */
function inputEvent() {
  if (fieldConfig.value?.isNumber) {
    // 数字输入
    let v = value.value as number | string | undefined
    const max = fieldConfig.value.max || AppConfig.maxNumber
    const min = fieldConfig.value.min || 0
    if (v !== '' && v !== undefined && v !== null && AirValidatorHelper.isNumber(v.toString())) {
      v = parseFloat(v.toString())
      v = v < min ? min : v
      v = v > max ? max : v
      value.value = v
    } else {
      v = undefined
      value.value = undefined
    }
    emits('onChange', v)
    emits('change', v)
    emits('update:modelValue', v)
  } else {
    emits('onChange', value.value)
    emits('change', value.value)
    emits('update:modelValue', value.value)
  }
}

/**
 * 选择事件
 */
function selectEvent() {
  if (value.value === '' || value.value === null) {
    value.value = undefined
  }
  emits('onChange', value.value)
  emits('change', value.value)
  emits('update:modelValue', value.value)
}

/**
 * 监听Value变化, 同步数据
 */
watch(value, () => {
  emits('onChange', value.value)
  emits('change', value.value)
  emits('update:modelValue', value.value)
})

// 初始化配置信息
if (props.entity && fieldName.value) {
  fieldConfig.value = (props.entity.prototype as AirModel).getCustomFormFieldConfig(fieldName.value)
  const field = (props.entity.prototype as AirModel).getCustomFieldName(fieldName.value)

  if (!placeholderRef.value) {
    // 默认生成输入的placeholder
    placeholderRef.value = `请输入${field}...`

    if (fieldConfig.value) {
      // 装饰了FormField
      if (fieldConfig.value.enumRecord || props.list || props.tree || fieldConfig.value.dateType !== undefined) {
        // 传入了枚举值
        placeholderRef.value = `请选择${field}...`
      }
      if (fieldConfig.value.placeholder) {
        // 传入了自定义placeholder
        placeholderRef.value = fieldConfig.value.placeholder
      }
    }
  }
}

// 初始化同步值
setValue(props)
if (props.modelValue === undefined && fieldConfig.value?.defaultValue !== undefined) {
  // 没有初始化的值 但装饰器设置了默认值
  value.value = fieldConfig.value.defaultValue
}
</script>
<style lang="scss" >
.air-input-cascader {
  display: inline;
  width: 100%;
}

.air-input-cascader-popper {
  margin-top: 8px !important;

  .el-cascader-menu__list {
    width: 100%;
  }
}

.air-input-number {
  .el-input__inner {
    text-align: left;
  }
}
</style>
