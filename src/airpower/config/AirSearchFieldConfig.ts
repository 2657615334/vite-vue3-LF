import { Expose } from 'class-transformer'
import { AirBetweenType } from '../enum/AirBetweenType'
import { AirFieldConfig } from './AirFieldConfig'
import { AirSearchDataType } from '../enum/AirSearchDataType'
import { ISearchFieldConfig } from '../interface/ISearchFieldConfig'
import { IRecord } from '../interface/IRecord'

/**
 * # 😂 查询字段配置实现类
 * @author Hamm
 */
export class AirSearchFieldConfig extends AirFieldConfig implements ISearchFieldConfig {
@Expose() hide = false

@Expose() type?: 'full_like' | 'like' | 'left_like' | 'right_like' | 'equals' | 'greater_than' | 'less_than' = 'like'

@Expose() orderNumber?= 1

@Expose() enumRecord?: IRecord[]

@Expose() between = false

@Expose() betweenType = AirBetweenType.DATE

@Expose() betweenMin = 0

@Expose() betweenMax = 100

@Expose() dataType = AirSearchDataType.TEXT
}
