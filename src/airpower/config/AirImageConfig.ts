/**
 * # 😄展示图片模型
 * @author Haichuan
 */
export class AirImageConfig {
  /** 
   * # 😄图片宽度
   */
  width = 100

  /** 
   * # 😄图片高度
   */
  height = 100

  /** 
  * # 😄图标或文字大小
  */
  getFontSize(width = 100): number {
    return width / 3.6
  }

  /** 
  * # 😄设置宽度
  */
  setWidth(width: number): this {
    this.width = width
    return this
  }

  /** 
  * # 😄设置高度
  */
  setHeight(height: number): this {
    this.height = height
    return this
  }

  /** 
  * # 😄设置大小
  */
  setSize(size: number): this {
    this.width = size
    this.height = size
    return this
  }
}
