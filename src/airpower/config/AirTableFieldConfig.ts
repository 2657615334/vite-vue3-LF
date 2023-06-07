import { Expose } from 'class-transformer'
import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { IRecord } from '../interface/IRecord'
import { AirFieldConfig } from './AirFieldConfig'
import { ITableFieldConfig } from '../interface/ITableFieldConfig'

/**
 * # 😄表格的字段配置实现类
 * @author Hamm
 */
export class AirTableFieldConfig extends AirFieldConfig implements ITableFieldConfig {
@Expose() hide = false

@Expose() removed = false

@Expose() width?: number

@Expose() minWidth?: number

@Expose() isDisabledField = false

@Expose() fixed?: 'left' | 'right'

@Expose() orderNumber = 1

@Expose() enumRecord?: IRecord[]

@Expose() dateTimeFormatter?: AirDateTimeFormatter | string

@Expose() showStatus?: boolean = true

@Expose() sortable?: boolean | 'custom' = false

@Expose() forceShow?: boolean = false

@Expose() align?: 'right' | 'left' | 'center' = 'left'

@Expose() suffixText?: string

@Expose() payloadField?: string

@Expose() isFriendlyDateTime?= false

@Expose() isCopyField?= false

@Expose() isImage?= false

@Expose() imageWidth?= 60

@Expose() imageHeight?= 60
}
