import { EdgeConfig } from '@logicflow/core'
import { AirFlowLinkType } from './AirFlowLinkType'

/**
 * # 流程图连线类
 * @author Hamm
 */
export class AirFlowLink implements EdgeConfig {
  /**
   * # 来源节点ID
   */
  sourceNodeId!: string

  /**
   * # 目标节点ID
   */
  targetNodeId!: string

  type = AirFlowLinkType

  text!: string

  setTarget(id: string): this {
    this.targetNodeId = id
    return this
  }

  /**
   * # 设置连线来源ID
   * @param id 
   * @returns 
   */
  setSource(id: string): this {
    this.sourceNodeId = id
    return this
  }
}
