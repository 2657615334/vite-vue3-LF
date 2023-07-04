import { Expose, Type } from 'class-transformer'
import { AirAbstractRequestPage } from '@/airpower/dto/AirAbstractRequestPage'
import { BulkTransportationEntity } from '@/entity/BulkTransportationEntity'

/**
 * 大件运输监控请求对象
 */
export class BulkTransportationRequestPage extends AirAbstractRequestPage {
  /** 查询参数 */
  @Type(() => BulkTransportationEntity)
  @Expose()
  queryParams!: BulkTransportationEntity | undefined
}
