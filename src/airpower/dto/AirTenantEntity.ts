import { Expose } from 'class-transformer'
import { FieldName } from '../decorator/CustomName'
import { AirAbstractEntity } from './AirAbstractEntity'

/**
 * # 😄默认租户实体
 * @author Hamm
 */
export class AirTenantEntity extends AirAbstractEntity {
  @Expose() id!: number

  /**
   * # 😄租户编码
   */
  @FieldName('租户编码')
  @Expose() code!: string

  /**
   * # 😄租户编码
   */
  @FieldName('租户名称')
  @Expose() name!: string

  @Expose() createdId!: number

  @Expose() createdTime!: number

  @Expose() createdBy!: string

  @FieldName('备注')
  @Expose() remark!: string
}
