import { ClassName, EntityConfig, FieldName, TableField } from '@/airpower/decorator'
import { AirColor, AirDateTimeFormatter } from '@/airpower/enum'
import { IRecord } from '@/airpower/interface'
import { BaseEntity } from '@/base/BaseEntity'
import { Expose } from 'class-transformer'

/**
 * # 车辆性质枚举
 */
export enum VehicleNatureEnum {
  /**
   * # 大件运输
   */
  BULK_TRANSPORTATION = 0,

  /**
   * # 护送车辆
   */
  ESCORT_VEHICLE = 1,
}

/**
 * # 车辆性质枚举翻译
 */
export const VehicleNatureRecord: IRecord[] = [
  {
    key: VehicleNatureEnum.BULK_TRANSPORTATION,
    label: '大件运输',
  },
  {
    key: VehicleNatureEnum.ESCORT_VEHICLE,
    label: '护送车辆',
    color: AirColor.SUCCESS,
  },
]

/**
 * # 执法单位枚举
 */
export enum LawEnforcementUnitEnum {
  /**
   * # 高一支一大队
   */
  A_BRIGADE = 0,

  /**
   * # 高一支二大队
   */
  SECOND_GROUP = 1,
}

/**
 * # 执法单位枚举翻译
 */
export const LawEnforcementUnitRecord: IRecord[] = [
  {
    key: LawEnforcementUnitEnum.A_BRIGADE,
    label: '高一支一大队',
  },
  {
    key: LawEnforcementUnitEnum.SECOND_GROUP,
    label: '高一支二大队',
  },
]

/**
 * 大件运输监控实体
 */
@ClassName('大件运输监控')
@EntityConfig({
  addTitle: '上道登记',
})
export class BulkTransportationEntity extends BaseEntity {
  /**
   * 车牌
   */
  @FieldName('车牌')
  @TableField()
  @Expose()
  licensePlate!: string

  /**
   * 车辆性质
   */
  @FieldName('车辆性质')
  @TableField({
    enumRecord: VehicleNatureRecord,
  })
  @Expose()
  vehicleNature!: VehicleNatureEnum

  /**
   * 入口收费站
   */
  @FieldName('入口收费站')
  @TableField()
  @Expose()
  entranceTollStation!: string

  /**
   * 入口时间
   */
  @FieldName('入口时间')
  @TableField({
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD_HH_mm,
  })
  @Expose()
  entryTime!: number

  /**
   * 高频通行线路
   */
  @FieldName('高频通行线路')
  @TableField()
  @Expose()
  highFrequencyTrafficLine!: string

  /**
   * 通行次数
   */
  @FieldName('通行次数')
  @TableField()
  @Expose()
  numberOfTraffic!: number

  /**
   * 执法单位
   */
  @FieldName('执法单位')
  @TableField({
    enumRecord: LawEnforcementUnitRecord,
  })
  @Expose()
  lawEnforcementUnit!: LawEnforcementUnitEnum

  /**
   * 联系电话
   */
  @FieldName('联系电话')
  @TableField()
  @Expose()
  contactNumber!: string

  /**
   * 最新位置
   */
  @FieldName('最新位置')
  @TableField()
  @Expose()
  latestLocation!: string

  /**
   * 通过时间
   */
  @FieldName('通过时间')
  @TableField({
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD_HH_mm,
  })
  @Expose()
  transitTime!: number
}
