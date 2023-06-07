import { Expose, Type } from 'class-transformer'
import { FieldName } from '../decorator/CustomName'
import { AirAbstractEntity } from './AirAbstractEntity'
import { AirTenantEntity } from './AirTenantEntity'
import { AirUserType } from '../enum/AirUserType'

/**
 * # 😄默认用户实体类
 * @author Hamm
 */
export class AirUserEntity extends AirAbstractEntity {
  @Expose() id!: number

  /**
   * # 😄真实姓名
   */
  @FieldName('真实姓名')
  @Expose() realName!: string;

  /**
   * # 😄账号
   */
  @FieldName('账号')
  @Expose({ name: 'username' })
  userName!: string;

  /**
   * # 😄手机号
   */
  @FieldName('手机')
  @Expose({ name: 'phonenumber' })
  phoneNumber!: string;

  /**
   * # 😄邮箱
   */
  @FieldName('邮箱')
  @Expose() email!: string;

  /**
   * # 😄用户类型
   */
  @Expose() userType!: AirUserType;

  /**
   * # 😄登录密码
   */
  @FieldName('密码')
  @Expose() password!: string;

  @Expose() createdId!: number

  @Expose() createdTime!: number

  @Expose() createdBy!: string

  @FieldName('备注')
  @Expose() remark!: string

  /**
   * # 😄所属租户信息
   */
  @Type(() => AirTenantEntity)
  @Expose() tenantInfo!: AirTenantEntity
}
