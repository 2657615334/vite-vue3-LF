import { Expose, Type } from 'class-transformer'
import { FieldName } from '../decorator/CustomName'
import { AirModel } from '../model/AirModel'

/**
 * # 😄平台信息配置
 * @author Hamm
 */
export class AirPlatformConfig extends AirModel {
  /**
   * # 😄是否中性版本
   */
  @FieldName('中性版')
  @Type(() => Boolean)
  @Expose() loginIsNeutral!: boolean

  /**
   * # 😄Logo
   */
  @FieldName('Logo')
  @Expose() logoIcon!: string

  /**
   * # 😄左下角底部合作方Logo
   */
  @FieldName('合作方Logo')
  @Expose() partnerLogoIcon!: string

  /**
   * # 😄平台名称
   */
  @FieldName('平台名称')
  @Expose() platformName!: string

  /**
   * # 😄当前应用的名称
   */
  @FieldName('应用名称')
  @Expose() appName!: string
}
