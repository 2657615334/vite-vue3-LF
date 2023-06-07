import { Expose } from 'class-transformer'
import { AppConfig } from '../AppConfig'
import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { AirDateTimeType } from '../enum/AirDateTimeType'
import { IRecord } from '../interface/IRecord'
import { AirFieldConfig } from './AirFieldConfig'
import { IFormFieldConfig } from '../interface/IFormFieldConfig'

/**
 * # 😂 表单字段配置实现类
 * @author Hamm
 */
export class AirFormFieldConfig extends AirFieldConfig implements IFormFieldConfig {
@Expose() dateValueFormatter?= AirDateTimeFormatter.TIMESTAMP

@Expose() dateShowFormatter?: AirDateTimeFormatter

@Expose() dateType?: AirDateTimeType

@Expose() max?= AppConfig.maxNumber

@Expose() min?= AppConfig.minNumber

@Expose() maxLength?: number

@Expose() minLength?: number

@Expose() placeholder?: string

@Expose() fieldName?: string

@Expose() isTextarea?: boolean

@Expose() isNumber?: boolean

@Expose() disabled?: boolean

@Expose() isPassword?: boolean

@Expose() prefixIcon?: string

@Expose() suffixIcon?: string

@Expose() suffixText?: string

@Expose() clearable?= true

@Expose() multiple?= false

@Expose() multipleLimit?= 0

@Expose() collapseTags?= true

@Expose() filterable?= true

@Expose() showPassword?= true

@Expose() showLimit?: boolean

@Expose() enumRecord?: IRecord[]

@Expose() checkStrictly?= true

@Expose() emitPath?= false

@Expose() showAllLevels?= false

@Expose() autoSize?= true

@Expose() minRows?= AppConfig.defaultTextareaMinRows

@Expose() maxRows?= AppConfig.defaultTextareaMaxRows

@Expose() isSwitch?= false

@Expose() hideSwitchLabel?= false

@Expose() isRadio?= false

@Expose() isRadioButton?= false

@Expose() defaultValue?: string | number | boolean;

@Expose() disableSwitchColor?= false
}
