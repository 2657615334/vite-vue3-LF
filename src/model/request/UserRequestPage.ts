import { Expose, Type } from 'class-transformer'
import { AirAbstractRequestPage } from '@/airpower/dto/AirAbstractRequestPage'
import { UserEntity } from '@/entity/UserEntity'

/**
 * 用户分页请求对象
 * @author Hamm
 */
export class UserRequestPage extends AirAbstractRequestPage {
  /** 查询参数 */
  @Type(() => UserEntity)
  @Expose()
  queryParams!: UserEntity | undefined
}
