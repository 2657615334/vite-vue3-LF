import { Expose, Type } from 'class-transformer'
import { AirAbstractResponsePage } from '@/airpower/dto/AirAbstractResponsePage'
import { UserEntity } from '@/entity/UserEntity'

/**
 * 用户分页响应类
 */
export class UserResponsePage extends AirAbstractResponsePage {
    @Expose()
    @Type(() => UserEntity)
    items: UserEntity[] = [];
}
