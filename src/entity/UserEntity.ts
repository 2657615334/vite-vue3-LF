/* eslint-disable no-unused-vars */
import { Expose, Type } from 'class-transformer'
import { ClassName, FieldName, SearchField, TableField, FormField } from '@/airpower/decorator'
import { IRecord } from '@/airpower/interface'
import { AirBetweenType, AirColor } from '@/airpower/enum'
import { BaseEntity } from '@/base/BaseEntity'
import { DepartmentEntity } from './DepartmentEntity'
import { AirDateTimeFormatter } from '@/airpower/helper'

/**
 * 用户类型
 */
export enum UserType {
  ROOT_USER = '00',
  IMPLEMENTER_USER = '01',
  OTHER = '02',
}

export const UserTypeRecord: IRecord[] = [
  {
    key: UserType.ROOT_USER,
    label: '超级管理员',
    color: AirColor.SUCCESS,
  },
  {
    key: UserType.IMPLEMENTER_USER,
    label: '实施人员',
    // color: '#000',
  },
  {
    key: UserType.OTHER,
    label: '其他用户',
    color: AirColor.NORMAL,
    disabled: true,
  },
]

export enum UserSex {
  MALE = 1,
  FEMALE = 0
}
export const UserSexRecord: IRecord[] = [
  {
    key: UserSex.FEMALE,
    label: '女',
  },
  {
    key: UserSex.MALE,
    label: '男',
  },
]

export const VipRecord: IRecord[] = [
  {
    key: true,
    label: '已开通',
    color: AirColor.WARNING,
  },
  {
    key: false,
    label: '未开通',
    color: AirColor.NORMAL,
  },
]

/**
 * 用户实体类
 */
@ClassName('用户')
export class UserEntity extends BaseEntity {
  @FieldName('昵称')
  @SearchField()
  @TableField({
    fixed: 'left',
    forceShow: true,
  })
  @FormField({
    maxLength: 8,
    prefixIcon: 'Calendar',
  })
  @Expose()
  name!: string

  @FieldName('性别')
  @SearchField({
    enumRecord: UserSexRecord,
  })
  @TableField({
    width: 60,
    enumRecord: UserSexRecord,
    showStatus: false,
  })
  @FormField({
    enumRecord: UserSexRecord,
    suffixIcon: 'Calendar',
  })
  @Expose({ name: 'user_sex' })
  userSex!: UserSex

  @FieldName('头像')
  @TableField()
  @Expose({ name: 'user_head' })
  userHead!: string

  @FieldName('签名')
  @SearchField()
  @TableField()
  @FormField({
    isTextarea: true,
    maxLength: 100,
    placeholder: '哈哈哈哈哈我不是下面的备注',
  })
  @Expose({ name: 'user_remark' })
  userRemark!: string

  @FieldName('身份')
  @SearchField({
    enumRecord: UserTypeRecord,
  })
  @TableField({
    width: 120,
    enumRecord: UserTypeRecord,
    showStatus: true,
  })
  @FormField()
  @Expose()
  userType!: UserType

  /**
   * 是否会员
   */
  @FieldName('会员权限')
  @TableField({
    enumRecord: VipRecord,
    showStatus: true,
  })
  @SearchField()
  @Expose()
  isVip?: boolean

  @FieldName('年龄')
  @SearchField({
    between: true,
    betweenMax: 50,
    betweenMin: 18,
    betweenType: AirBetweenType.NUMBER,
  })
  @FormField({
    min: -20,
    max: 88,
    isNumber: true,
  })
  @Expose()
  age!: number

  @FieldName('所属部门')
  @Type(() => DepartmentEntity)
  @FormField()
  @Expose()
  department!: DepartmentEntity[]

  @FieldName('注册时间')
  @TableField({
    width: 180,
    orderNumber: -99,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD_HH_mm,
    sortable: 'custom',
  })
  @Expose()
  declare createdTime: number
}
