import { Expose } from 'class-transformer'
import { AirModel } from '../model/AirModel'
import { AirSortType } from '../enum/AirSortType'

/**
 * # 😄排序对象
 * @author Hamm
 */

export class AirSort extends AirModel {
  /**
   * # 😄排序字段 默认createdTime
   */
  @Expose() columnName = 'createdTime';

  /**
   * # 😄排序方式 默认 desc
   */
  @Expose() sortType = AirSortType.DESC;
}
