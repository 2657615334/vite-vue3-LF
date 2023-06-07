import { Expose } from 'class-transformer'
import { FieldName } from '../decorator/CustomName'
import { SearchField } from '../decorator/SearchField'
import { AirModel } from '../model/AirModel'

/**
 * # 😂实体抽象基类
 * ```id``` ```createdId``` ```createdTime``` ```createdBy``` ```remark```
 * 
 * [HoldHope规范要求所有实体必选上述字段](https://url.hamm.cn/5yc2b)
 * @author Hamm
 */
export abstract class AirAbstractEntity extends AirModel {
  /** 
   * # 😄主键ID
   */
  abstract id: number;

  /** 
   * # 😄创建人ID
   */
  abstract createdId: number;

  /** 
   * # 😄创建时间
   */
  abstract createdTime: number;

  /** 
   * # 😄创建人昵称
   */
  abstract createdBy: string;

  /** 
   * # 😄备注与描述
   */
  abstract remark: string;

  /**
   * # 创建时间的区间
   */
  @FieldName('创建时间')
  @SearchField({
    between: true,
    orderNumber: -200,
  })
  @Expose()
  createdBetween!: Array<string | number>;

  /**
   * # 修改时间的区间
   */
  @FieldName('修改时间')
  @SearchField({
    between: true,
    orderNumber: -200,
  })
  @Expose()
  updatedBetween!: Array<string | number>;

  /**
   * # 😄设置ID 
   * @param id 设置ID
   * @returns 
   */
  setId(id: number): this {
    this.id = id
    return this
  }

  /**
   * # 😄设置备注
   * @param remark 备注
   * @returns 
   */
  setRemark(remark: string): this {
    this.remark = remark
    return this
  }
}
