import { Expose, Type } from 'class-transformer'
import { AirAbstractResponsePage } from '@/airpower/dto/AirAbstractResponsePage'
import { BulkTransportationEntity } from '@/entity/BulkTransportationEntity'

/**
 * 用户分页响应类
 */
export class BulkTransportationResponsePage extends AirAbstractResponsePage {
  @Expose()
  @Type(() => BulkTransportationEntity)
  items: BulkTransportationEntity[] = []
}
