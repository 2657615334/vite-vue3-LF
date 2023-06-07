import { AirBetweenType } from '../enum/AirBetweenType'
import { IFieldConfig } from './IFieldConfig'
import { AirSearchDataType } from '../enum/AirSearchDataType'
import { IRecord } from '../interface/IRecord'

/**
 * # 😄表格的字段配置接口
 * @author Hamm
 */

export interface ISearchFieldConfig extends IFieldConfig {
  /**
   * # 😄是否隐藏搜索
   */
  hide?: boolean;

  /**
   * # 😄搜索的类型 默认```like```
   */
  type?: 'full_like' | 'like' | 'left_like' | 'right_like' | 'equals' | 'greater_than' | 'less_than';

  /**
   * # 😄排序 越大越靠上边
   */
  orderNumber?: number;

  /**
   * # 😄枚举数据集
   */
  enumRecord?: IRecord[];

  /**
   * # 😄是否是区间控件
   * 可配置 ```betweenType```,```betweenMin```,```betweenMax``` 等参数
   */
  between?: boolean;

  /**
   * # 😄区间类型
   */
  betweenType?: AirBetweenType;

  /**
   * # 😄区间最小值
   */
  betweenMin?: number;

  /**
   * # 😄区间最大值
   */
  betweenMax?: number;

  /**
   * # 😄搜索数据类型
   */
  dataType?: AirSearchDataType;

}
