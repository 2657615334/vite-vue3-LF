import { Expose } from 'class-transformer'
import { IFieldConfig } from '../interface/IFieldConfig'

/**
 * # 😄字段配置基类
 */
export class AirFieldConfig implements IFieldConfig {
@Expose() key?: string

@Expose() label?: string
}
