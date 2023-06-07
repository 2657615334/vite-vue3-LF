/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * # 😄表单字段的注解
 * @author Hamm
 */

import { AirClassTransformerHelper } from '../helper/AirClassTransformerHelper'
import { AirFormFieldConfig } from '../config/AirFormFieldConfig'
import { IFormFieldConfig } from '../interface/IFormFieldConfig'
import { AirModel } from '../model/AirModel'
import { getFieldName } from './CustomName'

/** 
 * # 😄表单字段key
 */
const formFieldMetaKey = Symbol('formFieldConfig')
const formFieldListMetaKey = Symbol('formFieldConfigList')

/**
 * # 😄标记该字段可用于表单配置
 * @param formFieldConfig 配置项(可选)
 * @returns 
 * ```
 * //设置方式
 * \@FormField()
 * \@FormField({placeholder:'Hello World'})
 * ```
 */
export const FormField = <E extends AirModel>(formFieldConfig?: IFormFieldConfig) => (target: E, key: string) => {
  if (!formFieldConfig) {
    formFieldConfig = new AirFormFieldConfig()
  }
  formFieldConfig.key = key
  const list = Reflect.getOwnMetadata(formFieldListMetaKey, target) || []
  list.push(formFieldConfig)
  Reflect.defineMetadata(formFieldListMetaKey, list, target)
  Reflect.defineMetadata(formFieldMetaKey, formFieldConfig, target, key)
}

/**
 * # 😄获取对象某个字段标记的表单配置项
 * @param target 目标类或对象
 * @param fieldKey 属性名
 * @returns 
 */
export function getFormFieldConfig(target: any, fieldKey: string): AirFormFieldConfig | null {
  let formFieldConfig = Reflect.getMetadata(formFieldMetaKey, target, fieldKey)

  if (!formFieldConfig) {
    // 没有查询到配置
    const superClass = Object.getPrototypeOf(target)
    if (superClass.constructor.name === AirModel.name) {
      return null
    }
    formFieldConfig = getFormFieldConfig(superClass, fieldKey)
  }
  if (!formFieldConfig) {
    // 一直遍历到AirModel都没找到
    return null
  }

  formFieldConfig = AirClassTransformerHelper.parse(formFieldConfig, AirFormFieldConfig)
  if (!formFieldConfig.label || formFieldConfig.label === formFieldConfig.key) {
    formFieldConfig.label = getFieldName(target, fieldKey)
  }
  return formFieldConfig
}
/**
 * # 😄获取标记了表单配置的字段列表
 * @param target 目标对象
 * @returns 
 */
export function getCustomFormFieldNameList<E extends AirModel>(target: E): string[] {
  let list: string[] = Reflect.getOwnMetadata(formFieldListMetaKey, target) || []
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name !== AirModel.name) {
    list = list.concat(getCustomFormFieldNameList(superClass))
  }
  return list
}
/**
 * # 😄获取指定类的表单字段配置项列表
 * @param target 目标类或对象
 * @param fieldNameList 选择字段列表
 * @returns 
 */
export function getCustomFormFieldList<E extends AirModel>(target: E, ...fieldNameList: string[]) {
  if (fieldNameList.length === 0) {
    fieldNameList = getCustomFormFieldNameList(target)
  }
  const keyList = []
  const list: AirFormFieldConfig[] = []
  for (const fieldName of fieldNameList) {
    if (keyList.indexOf(fieldName) >= 0) {
      continue
    }
    const config = getFormFieldConfig(target, fieldName)
    if (config) {
      keyList.push(config.key)
      list.push(config)
    }
  }
  return list
}
