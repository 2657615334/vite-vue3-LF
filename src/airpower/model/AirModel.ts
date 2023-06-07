import { instanceToPlain } from 'class-transformer'
import { getClassName, getFieldName, getDescription } from '../decorator/CustomName'
import { getFormFieldConfig } from '../decorator/FormField'
import { getCustomSearchFieldList } from '../decorator/SearchField'
import { getCustomTableFieldList } from '../decorator/TableField'
import { AirFormFieldConfig } from '../config/AirFormFieldConfig'
import { AirSearchFieldConfig } from '../config/AirSearchFieldConfig'
import { AirTableFieldConfig } from '../config/AirTableFieldConfig'

/**
 * # 😂AirModel 模型基类
 * - 模型基类包含了一些常用模型的操作
 * - 一般不建议为实体给默认值 @see withDefaultValue
 * @author Hamm
 */
export class AirModel {
  /**
   * # 😄将与实体字段名一致的普通JSON对象合并到实体上
   * 
   * 请注意，如果是原始JSON对象，请通过```AirClassTransformerHelper.parse()```进行转换
   * 
   * @param obj 普通JSON对象
   * @returns 
   */
  copy(obj: Record<string, any>): this {
    return Object.assign(this, obj)
  }

  /**
   * # 暴露部分类的字段
   * @param fields 字段列表 
   * @returns 
   */
  expose(...fields: string[]): this {
    const fieldList = Object.keys(this)
    for (const field of fieldList) {
      if (!fields.includes(field)) {
        // eslint-disable-next-line
        (this as any)[field] = undefined
      }
    }
    return this
  }

  /**
   * # 排除部分类的字段
   * @param fields 字段列表 
   * @returns 
   */
  exclude(...fields: string[]): this {
    const fieldList = Object.keys(this)
    for (const field of fieldList) {
      if (fields.includes(field)) {
        // eslint-disable-next-line
        (this as any)[field] = undefined
      }
    }
    return this
  }

  /**
   * # 😄获取类的可阅读名字
   * 可使用 @ClassName 装饰器修饰 如无修饰 则直接返回类名
   * @returns 类的可读名字
   */
  getCustomClassName(): string {
    return getClassName(this.constructor) || this.constructor.name
  }

  /**
   * # 😄获取属性的可阅读名字
   * @param fieldKey 属性名
   * @returns 属性的可读名字
   * 可使用 @FieldName 装饰器修饰 如无修饰 则直接返回属性名
   */
  getCustomFieldName(fieldKey: string): string {
    return getFieldName(this, fieldKey)
  }

  /**
   * # 😄获取属性的描述
   * @param fieldKey 属性名
   * @returns 属性的描述
   * 可使用 @Description 装饰器修饰 如无修饰 则直接返回空字符串
   */
  getCustomDescription(fieldKey: string): string {
    return getDescription(this, fieldKey)
  }

  /**
   * # 😄直接转为普通JSON对象
   * 此方法不会按别名转换,如需别名转换 请调用 @see toSourceObject()
   * @returns JSON对象
   */
  toObject(): Record<string, any> {
    return JSON.parse(JSON.stringify(this))
  }

  /**
   * # 😄将模型对象转为JSON字符串
   * 此方法不会按别名转换,如需别名转换 请调用 @see toSourceString()
   * @returns JSON字符串
   */
  toString(): string {
    return JSON.stringify(this)
  }

  /**
   * # 😄按别名转换为普通的JSON对象
   * @returns JSON对象
   */
  toSourceObject(): Record<string, any> {
    return instanceToPlain(this)
  }

  /**
   * # 😄按别名转换为原始JSON字符串
   * @returns JSON字符串
   */
  toSourceString(): string {
    return JSON.stringify(instanceToPlain(this))
  }

  /**
   * # 😄获取表格字段的配置列表
   * @param fieldNameList 字段列表
   * @returns 
   */
  getTableFieldConfigList(...fieldNameList: string[]): AirTableFieldConfig[] {
    const configList = getCustomTableFieldList(this, fieldNameList)
    configList.sort((a, b) => b.orderNumber - a.orderNumber)
    return configList
  }

  /**
   * # 😄获取搜索字段的配置列表
   * 如不传入参数 则默认取所有标记了注解的字段
   * @param fieldNameList [可选]字段列表
   * @returns 
   */
  getSearchFieldConfigList(...fieldNameList: string[]): AirSearchFieldConfig[] {
    const res = getCustomSearchFieldList(this, fieldNameList)
    res.sort((a, b) => (b.orderNumber || 1) - (a.orderNumber || 1))
    const queryParams: AirSearchFieldConfig[] = []
    for (const config of res) {
      queryParams.push(config)
    }
    return queryParams
  }

  /**
   * # 😄获取属性的表单配置
   * @param fieldKey 属性名
   * @returns 
   */
  getCustomFormFieldConfig(fieldKey: string): AirFormFieldConfig | null {
    return getFormFieldConfig(this, fieldKey)
  }

  /**
   * # 😄为当前实体初始化默认值
   * @returns 带默认值的实体
   */
  withDefaultValue(): this {
    return this
  }
}
