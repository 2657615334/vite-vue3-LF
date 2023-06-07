/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * # 😄搜索字段的注解
 * @author Hamm
 */

import { AirClassTransformerHelper } from '../helper/AirClassTransformerHelper'
import { ISearchFieldConfig } from '../interface/ISearchFieldConfig'
import { AirModel } from '../model/AirModel'
import { AirSearchFieldConfig } from '../config/AirSearchFieldConfig'
import { getFieldName } from './CustomName'

/**
 *  # 😄搜索字段key
 */
const searchFieldMetaKey = Symbol('searchFieldConfig')

/** 
 * # 😄搜索字段列表key
 */
const searchFieldListMetaKey = Symbol('searchFieldConfigList')

/**
 * # 😄标记该字段可用于搜索
 * @param searchFieldConfig 搜索配置项(可选)
 * @returns 
 * ```
 * //设置方式
 * \@SearchField()
 * \@SearchField({type:'full_like'})
 * ```
 */
export const SearchField = <E extends AirModel>(searchFieldConfig?: ISearchFieldConfig) => (target: E, key: string) => {
  if (!searchFieldConfig) {
    searchFieldConfig = new AirSearchFieldConfig()
  }
  searchFieldConfig.key = key
  const list = Reflect.getOwnMetadata(searchFieldListMetaKey, target) || []
  list.push(key)
  Reflect.defineMetadata(searchFieldListMetaKey, list, target)
  Reflect.defineMetadata(searchFieldMetaKey, searchFieldConfig, target, key)
}

/**
 * # 😄获取对象某个字段标记的搜索配置项
 * @param target 目标类或对象
 * @param fieldKey 属性名
 * @returns 
 */
export function getSearchFieldConfig(target: any, fieldKey: string): AirSearchFieldConfig | null {
  let searchFieldConfig = Reflect.getOwnMetadata(searchFieldMetaKey, target, fieldKey)
  if (searchFieldConfig === undefined) {
    const superClass = Object.getPrototypeOf(target)
    if (superClass.constructor.name === AirModel.name) {
      return null
    }
    searchFieldConfig = getSearchFieldConfig(superClass, fieldKey)
  }
  if (!searchFieldConfig) {
    // 一直遍历到AirModel都没找到
    return null
  }

  searchFieldConfig = AirClassTransformerHelper.parse(searchFieldConfig, AirSearchFieldConfig)
  if (!searchFieldConfig.label || searchFieldConfig.label === searchFieldConfig.key) {
    searchFieldConfig.label = getFieldName(target, fieldKey)
  }
  return searchFieldConfig
}
/**
 * # 😄获取标记了搜索配置的字段列表
 * @param target 目标对象
 * @returns 
 */
export function getCustomSearchFieldNameList<E extends AirModel>(target: E): string[] {
  let list: string[] = Reflect.getOwnMetadata(searchFieldListMetaKey, target) || []
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name !== AirModel.name) {
    list = list.concat(getCustomSearchFieldNameList(superClass))
  }
  return list
}
/**
 * # 😄获取指定类的搜索字段配置项列表
 * @param target 目标类或对象
 * @param fieldNameList 选择字段列表
 * @returns 
 */
export function getCustomSearchFieldList<E extends AirModel>(target: E, fieldNameList: string[]) {
  const searchFieldConfigList: AirSearchFieldConfig[] = []
  const keyList = []
  if (fieldNameList.length === 0) {
    fieldNameList = getCustomSearchFieldNameList(target)
  }
  for (const fieldName of fieldNameList) {
    if (keyList.indexOf(fieldName) >= 0) {
      continue
    }
    const config = getSearchFieldConfig(target, fieldName)
    if (config) {
      keyList.push(config.key)
      searchFieldConfigList.push(config)
    }
  }
  return searchFieldConfigList
}
