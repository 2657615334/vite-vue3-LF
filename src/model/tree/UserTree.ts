import { Expose, Type } from 'class-transformer'
import { BaseAbstractTree } from '@/base/BaseAbstractTree'
import { UserEntity } from '@/entity/UserEntity'

export class UserTree extends BaseAbstractTree {
  @Type(() => UserEntity)
  @Expose()
  children: UserEntity[] = [];
}
