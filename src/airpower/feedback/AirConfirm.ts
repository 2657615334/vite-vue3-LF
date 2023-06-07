import { ElMessageBox } from 'element-plus'
import { AirFeedbackIcon } from '../enum/AirFeedbackIcon'
import { AirAlert } from './AirAlert'

/**
 * # 😄 确认弹窗类
 * @author Hamm
 */
export class AirConfirm extends AirAlert {
  /**
   * # 😄弹出确认框 DEMO
   * 
   * ```javascript
   * try{
   *    await new AirConfirm()
   *        .setTitle("确认提醒").setContent("是否确认继续操作？")
   *        .setConfirmText("继续").setCancelText("终止")
   *        .warning();
   *    //接下来是确认后的操作代码
   * }catch(e){
   *    //接下来是取消操作后的代码
   * }
   * ```
   */
  constructor() {
    super()
    this.title = '请你确认'
    this.content = '是否确认继续操作？'
    this.confirmText = '确认'
    this.cancelText = '取消'
    this.icon = AirFeedbackIcon.NONE
  }

  /**
   * # 😄设置取消按钮文字
   * @param cancelText 取消按钮文字
   * @returns 
   */
  setCancelText(cancelText: string): this {
    this.cancelText = cancelText
    return this
  }

  /**
   * # 😄启用ESC关闭
   * @returns 
   */
  enableEscClose(): this {
    this.isCloseByEscape = true
    return this
  }

  /**
   * # 😄启用遮罩层关闭
   * @returns 
   */
  enableCoverClose(): this {
    this.isCloseByCover = true
    return this
  }

  /**
   * # 😄显示成功图标的确认框
   * @param content [可选] 消息内容
   * @returns 
   */
  success(content?: string): Promise<void> {
    if (content) {
      this.setContent(content)
    }
    this.icon = AirFeedbackIcon.SUCCESS
    return this.show()
  }

  /**
   * # 😄显示警告图标的确认框
   * @param content [可选] 消息内容
   * @returns 
   */
  warning(content?: string): Promise<void> {
    if (content) {
      this.setContent(content)
    }
    this.icon = AirFeedbackIcon.WARNING
    return this.show()
  }

  /**
   * # 😄显示错误图标的确认框
   * @param content [可选] 消息内容
   * @returns 
   */
  error(content?: string): Promise<void> {
    if (content) {
      this.setContent(content)
    }
    this.icon = AirFeedbackIcon.ERROR
    return this.show()
  }

  /**
   * # 😄显示消息图标的确认框
   * @param content [可选] 消息内容
   * @returns 
   */
  info(content?: string): Promise<void> {
    if (content) {
      this.setContent(content)
    }
    this.icon = AirFeedbackIcon.INFO
    return this.show()
  }

  /**
   * # 😄显示无图标确认弹窗 
   * 带图标请直接 ```.success()``` ```.warning()``` ```.error()```
   * @param content [可选] 消息内容
   * @returns 
   */
  show(content?: string): Promise<void> {
    if (content) {
      this.setContent(content)
    }
    return new Promise<void>((resolve, reject) => {
      ElMessageBox.confirm(
        this.content,
        this.title,
        this.getConfig(),
      )
      .then(() => {
        resolve()
      })
      .catch(() => {
        reject()
      })
    })
  }
}
