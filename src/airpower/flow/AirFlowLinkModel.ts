import { PolylineEdgeModel } from '@logicflow/core'
import { EdgeAnimation } from '@logicflow/core/types/constant/DefaultTheme'

/**
 * # 流程图连线模型
 * @author Hamm
 */
export class AirFlowLinkModel extends PolylineEdgeModel {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  initEdgeData(data: any): void {
    super.initEdgeData(data)
    this.customTextPosition = true
  }

  setAttributes(): void {
    this.isAnimation = true
  }

  getEdgeAnimationStyle(): EdgeAnimation {
    const style = super.getEdgeAnimationStyle()
    style.strokeDasharray = '5 5'
    style.animationDuration = '100s'
    return style
  }
}
