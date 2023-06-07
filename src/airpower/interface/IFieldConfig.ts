/**
 * # 😄字段配置接口
 * @author Hamm
 */

export interface IFieldConfig {
  /**
   * # 😄 字段标题
   * 此字段无需传入, 将自动从被标记类的属性上读取
   * @deprecated
   */
  key?: string;

  /**
   * # 😄字段标题
   * 如传入 则将覆盖 ```@ClassName``` ```@FieldName``` 的声明
   */
  label?: string;
}
