import { Expose, Type } from 'class-transformer'
import { AirPage } from './AirPage'
import { AirAbstractRequest } from './AirAbstractRequest'

/**
 * # 😄网络请求分页抽象数据模型
 * @author Hamm
 */
export abstract class AirAbstractRequestPage extends AirAbstractRequest {
  /** 
   * # 😄分页对象 
   */
  @Type(() => AirPage)
  @Expose()
  page = new AirPage();
}
