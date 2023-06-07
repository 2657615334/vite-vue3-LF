import { Expose } from 'class-transformer'
import { AirPage } from './AirPage'

/**
 * # 😄网络响应分页基础数据模型
 * @author Hamm
 */
export class AirBaseResponsePage extends AirPage {
  /** 
   * # 😄总行数 
   */
  @Expose() total = 0;
}
