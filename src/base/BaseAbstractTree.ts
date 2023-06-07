import { Expose } from 'class-transformer'
import { ITree } from '@/airpower/interface/ITree'
import { BaseEntity } from './BaseEntity'
import { FieldName } from '@/airpower/decorator'

/**
 * # 😂 基础树对象
 * @author Hamm
 */
export abstract class BaseAbstractTree extends BaseEntity implements ITree {
  @FieldName('父节点')
  @Expose() parentId!: number;

  @FieldName('名称')
  @Expose() name!: string;

  @FieldName('标签')
  @Expose() tag!: string;

  /** 
   * # 子集数据
   */
  abstract children: any;
}
