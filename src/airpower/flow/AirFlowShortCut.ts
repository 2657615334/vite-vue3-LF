/**
 * # 流程图快捷键类
 * @author Hamm
 */
export class AirFlowShortCut {
    /**
     * # 按键
     */
    keys!: string[]

    // eslint-disable-next-line @typescript-eslint/ban-types
    callback!: Function

    /**
     * # 添加按键
     * @param keys 
     * @returns 
     */
    setKey(...keys: string[]): this {
      this.keys = keys
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
