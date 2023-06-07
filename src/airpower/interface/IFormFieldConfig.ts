import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { AirDateTimeType } from '../enum/AirDateTimeType'
import { IFieldConfig } from './IFieldConfig'
import { IRecord } from './IRecord'

/**
 * # 😄表单的字段配置接口
 * @author Hamm
 */
export interface IFormFieldConfig extends IFieldConfig {
  /**
   * # 😄回传值的格式化方式
   */
  dateValueFormatter?: AirDateTimeFormatter | string;

  /**
   * # 😄显示值的格式化方式
   */
  dateShowFormatter?: AirDateTimeFormatter | string;

  /**
   * # 😄时间日期控件格式
   */
  dateType?: AirDateTimeType;

  /**
   * # 😄最大数字
   */
  max?: number;

  /**
   * # 😄最小数字
   */
  min?: number;

  /**
   * # 😄最大长度
   */
  maxLength?: number;

  /**
   * # 😄最小长度
   */
  minLength?: number;

  /**
   * # 😄占位文本
   */
  placeholder?: string;

  /**
   * # 😄字段名称
   */
  fieldName?: string;

  /**
   * # 😄是否文本域
   */
  isTextarea?: boolean;

  /**
   * # 😄是否是数字
   */
  isNumber?: boolean;

  /**
   * # 😄是否显示清除按钮
   */
  clearable?: boolean;

  /**
   * # 😄是否禁用
   */
  disabled?: boolean;

  /**
   * # 😄是否密码框
   */
  isPassword?: boolean;

  /**
   * # 😄前置图标
   * 
   * 只支持 [Element Plus内置的图标](https://url.hamm.cn/5yc2d)
   */
  prefixIcon?: string;

  /**
   * # 😄后置图标
   * 
   * 只支持 [Element Plus内置的图标](https://url.hamm.cn/5yc2d)
   */
  suffixIcon?: string;

  /**
   * # 😄后置文字
   */
  suffixText?: string;

  /**
   * # 😄是否多选
   */
  multiple?: boolean;

  /**
   * # 😄是否收起多选标签
   */
  collapseTags?: boolean;

  /**
   * # 😄是否可筛选
   */
  filterable?: boolean;

  /**
   * # 😄限制最多选择多少个
   */
  multipleLimit?: number;

  /**
   * # 😄是否显示密码预览按钮
   */
  showPassword?: boolean;

  /**
   * # 😄父子关联
   */
  checkStrictly?: boolean;

  /**
   * # 😄显示输入限制
   * AppConfig中支持配置全局默认状态 如
   * 
   * ```typescript
   * AppConfig.defaultInputShowLimit = true
   * AppConfig.defaultTextAreaShowLimit = false
   * ```
   */
  showLimit?: boolean;

  /**
   * # 😄下拉选择枚举数据
   */
  enumRecord?: IRecord[];

  /**
   * # 😄返回全路径的值
   */
  emitPath?: boolean;

  /**
   * # 😄显示全路径
   */
  showAllLevels?: boolean;

  /**
   * # 😄是否自适应
   */
  autoSize?: boolean;

  /**
   * # 😄最小行数
   */
  minRows?: number;

  /**
   * # 😄最大行数
   */
  maxRows?: number;

  /**
   * # 😄是否使用Switch控件
   */
  isSwitch?: boolean;

  /**
   * # 😄使用Switch控件时是否隐藏Label文字
   */
  hideSwitchLabel?: boolean;

  /**
   * # 😄是否使用Radio控件
   */
  isRadio?: boolean;

  /**
   * # 😄使用Radio控件时用按钮的样式
   */
  isRadioButton?: boolean;

  /**
   * # 😄表单的默认值
   */
  defaultValue?: boolean | string | number;

  /**
   * # 😄switch不使用枚举配置的颜色
   */
  disableSwitchColor?: boolean;
}
