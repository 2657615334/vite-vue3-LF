import { Expose, Type } from 'class-transformer'
import { AirAbstractRequestPage } from './AirAbstractRequestPage'
import { AirModel } from '../model/AirModel'

/**
 * # 😄基础网络请求数据模型
 * @author Hamm
 */
export class AirRequest extends AirAbstractRequestPage {
  @Type(() => AirModel)
  @Expose() queryParams!: AirModel | undefined;
}
