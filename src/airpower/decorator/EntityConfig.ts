/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * # 😄搜索配置的注解
 * @author Hamm
 */

import { AirClassTransformerHelper } from '../helper/AirClassTransformerHelper'
import { AirEntityConfig } from '../config/AirEntityConfig'
import { IEntityConfig } from '../interface/IEntityConfig'

/**
 *  # 😄搜索配置key
 */
const entityConfigMetaKey = Symbol('entityConfig')

/**
 * # 😄为类标记一个配置
 * @param config 类的配置
 * @returns 
 */
export function EntityConfig(config?: IEntityConfig) {
  return (target: any) => {
    if (!config) {
      config = new AirEntityConfig()
    }
    Reflect.defineMetadata(entityConfigMetaKey, config, target)
  }
}

/**
 * # 😄获取类的配置
 * @param target 目标类
 * @returns 
 */
export function getEntityConfig(target: any): AirEntityConfig {
  return AirClassTransformerHelper.parse(Reflect.getOwnMetadata(entityConfigMetaKey, target), AirEntityConfig) || new AirEntityConfig()
}
