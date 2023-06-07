import { Expose } from 'class-transformer'
import { AirSort } from './AirSort'
import { AirModel } from '../model/AirModel'

/**
 * # 😄网络请求抽象数据模型
 * @author Hamm
 */
export abstract class AirAbstractRequest extends AirModel {
  /**
   * # 😄查询对象
   */
  @Expose()
  abstract queryParams: any;

  /**
   * # 😄搜索关键词
   */
  @Expose()
  keyword!: string

  /** 
   * # 😄排序对象
   */
  @Expose()
  sort?: AirSort;
}
