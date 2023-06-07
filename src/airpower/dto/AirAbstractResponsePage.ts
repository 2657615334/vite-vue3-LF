import { Expose } from 'class-transformer'
import { AirBaseResponsePage } from './AirBaseResponsePage'

/**
 * # 😄网络响应分页抽象数据模型
 * @author Hamm
 */
export abstract class AirAbstractResponsePage extends AirBaseResponsePage {
  /**
   * # 😄返回的分页数据
   * 请注意 @Expose
   */
  @Expose()
  abstract items: any;
}
