import { HtmlNode } from '@logicflow/core'

/**
 * # 流程节点视图
 * @author Hamm
 */
export class AirFlowNodeView extends HtmlNode {
  /**
   * # 示例 请按需自行重写
   * @param rootEl 
   */
  setHtml(rootEl: HTMLElement): void {
    const data = this.props.model.properties
    const el = document.createElement('div')
    el.className = 'air-flow-node'
    el.innerHTML = `
    <div>${JSON.stringify(data)}</div>
    `
    rootEl.innerHTML = ''
    rootEl.appendChild(el)
  }
}
