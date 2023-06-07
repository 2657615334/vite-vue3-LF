/**
 * # 流程图菜单封装类
 * @author Hamm
 */
export class AirFlowMenu {
    text!: string

    // eslint-disable-next-line @typescript-eslint/ban-types
    callback!: Function
    
    /**
     * # 设置菜单文字
     * @param text 
     * @returns 
     */
    setText(text: string): this {
      this.text = text 
      return this
    }

    /**
     * # 设置回调方法
     * @param callback 回调方法
     * @returns 
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    setCallback(callback: Function): this {
      this.callback = callback
      return this
    }
}
