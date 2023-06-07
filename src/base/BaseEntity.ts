import { Expose } from 'class-transformer'
import { FieldName, TableField, SearchField, FormField, EntityConfig } from '@/airpower/decorator'
import { AirAbstractEntity } from '@/airpower/dto/AirAbstractEntity'
import { AirDateTimeFormatter } from '@/airpower/helper'

/**
 * # 😂 数据库实体基类
 * ```updatedId``` ```updatedTime``` ```updatedBy``` ```isDisabled```
 * 
 * [HoldHope规范上述字段为业务自行确定的非必选字段](https://doc.weixin.qq.com/sheet/e3_AG0AwQYUAFQ009I1moGR6inIaroPH?scode=AIcAQgelAAgBqUc77EAFYA_QY6ABc)
 * @author Hamm
 */
@EntityConfig({
  
})
export class BaseEntity extends AirAbstractEntity {
  @Expose()
  id!: number;

  @Expose()
  createdId!: number;

  @FieldName('创建时间')
  @TableField({
    width: 180,
    orderNumber: -99,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD_HH_mm,
  })
  @Expose()
  createdTime!: number;

  @FieldName('创建人')
  @Expose()
  @SearchField({
    orderNumber: -100,
  })
  createdBy!: string;

  @FieldName('备注')
  @Expose()
  @SearchField({
    type: 'like',
    orderNumber: -1000,
  })
  @FormField({
    isTextarea: true,
  })
  remark!: string;

  /** 
   * # 修改人ID
   */
  @Expose()
  updatedId!: number;

  /** 
   * # 修改时间
   */
  @FieldName('修改时间')
  @Expose()
  updatedTime!: string;

  /** 
   * # 修改人昵称
   */
  @FieldName('修改人')
  @Expose()
  @SearchField({
    orderNumber: -100,
  })
  updatedBy!: string;

  /** 
   * # 是否禁用
   */
  @FieldName('是否禁用')
  @Expose()
  isDisabled!: boolean;
}
