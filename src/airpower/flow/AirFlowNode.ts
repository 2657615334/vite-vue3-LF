import { NodeConfig } from '@logicflow/core'
import { AirAbstractEntity } from '../dto/AirAbstractEntity'
import { AirRandHelper } from '../helper/AirRandHelper'

/**
 * # 流程图节点类
 * @author Hamm
 */
export class AirFlowNode<E extends AirAbstractEntity> implements NodeConfig {
  constructor() {
    this.properties.key = AirRandHelper.getRandCharString()
  }

  /**
   * # 节点ID
   */
  id!: string

  type = 'rect'

  /**
   * # 坐标
   */
  x!: number

  /**
   * # 坐标
   */
  y!: number

  /**
   * # 文本
   */
  text!: string

  /**
   * # 数据
   */
  properties: any = {
    key: '',
    isGroup: false,
    dataList: [],
    data: null,
    oldId: 0,
  }

  /**
   * # 设置ID 
   * @param id 
   * @returns 
   */
  setId(id: string): this {
    this.id = id
    return this
  }

  /**
   * # 设置ID 
   * @param id 
   * @returns 
   */
  setOldId(oldId: number): this {
    this.properties.oldId = oldId
    return this
  }

  /**
   * # 设置自定义视图类型
   * @param type 视图类型
   * @returns 
   */
  setType(type: string): this {
    this.type = type
    return this
  }

  /**
   * # 设置坐标
   * @param x 坐标
   * @param y 坐标
   * @returns 
   */
  setPosition(x: number, y: number): this {
    this.x = x
    this.y = y
    return this
  }

  /**
   * # 设置数据
   * @param data 
   * @returns 
   */
  setData(data: E): this {
    this.properties.data = data
    return this
  }

  /**
   * # 设置数据
   * @param list 
   * @returns 
   */
  setDataList(list: E[]): this {
    this.properties.dataList = list
    return this
  }

  /**
   * # 设置为组合体
   * @returns 
   */
  setIsGroup(): this {
    this.properties.isGroup = true
    return this
  }
}
