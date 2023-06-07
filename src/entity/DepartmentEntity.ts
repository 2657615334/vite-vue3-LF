import { Expose } from 'class-transformer'
import { BaseEntity } from '@/base/BaseEntity'

/**
 * 实体
 */
export class DepartmentEntity extends BaseEntity {
  /**
   * 部门名称
   */
  @Expose()
  name!: string;
}
