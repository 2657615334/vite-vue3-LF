import { Expose, Type } from 'class-transformer'
import { FieldName } from '../decorator/CustomName'
import { ITree } from '../interface/ITree'
import { AirAbstractEntity } from './AirAbstractEntity'

/**
 * # 😄 标准树结构实体类
 * @author Hamm
 */
export class AirMenuTreeEntity extends AirAbstractEntity implements ITree {
  @Expose() id!: number

  @Expose() parentId!: number

  @FieldName('菜单名称')
  @Expose() name!: string

  @Expose() tag!: string

  @Type(() => AirMenuTreeEntity)
  @Expose() children!: AirMenuTreeEntity[]

  @Expose() createdId!: number

  @Expose() createdTime!: number

  @Expose() createdBy!: string

  @Expose() remark!: string

  /**
   * # 😄 访问路径
   */
  @FieldName('访问路径')
  @Expose() path!: string

  /**
   * # 😄 组件路径
   */
  @FieldName('组件路径')
  @Expose() component!: string

  /**
   * # 😄 菜单图标
   */
  @FieldName('菜单图标')
  @Expose() icon!: string
}
