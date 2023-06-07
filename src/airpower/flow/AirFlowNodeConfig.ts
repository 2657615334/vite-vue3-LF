import { HtmlNodeModel } from '@logicflow/core'

/**
 * # 流程节点配置
 * @author Hamm
 */
export class AirFlowNodeConfig extends HtmlNodeModel {
  setAttributes(): void {
    this.text.editable = false // 禁止节点文本编辑
    this.anchorsOffset = [
      [this.width / 2, 0],
      [0, this.height / 2],
      [-this.width / 2, 0],
      [0, -this.height / 2],
    ]
  }
}
