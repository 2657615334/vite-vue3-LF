/* eslint-disable no-unused-vars */
import { ElMessageBox, ElMessageBoxOptions } from 'element-plus'
import { CSSProperties } from 'vue'
import { AirFeedbackIcon } from '../enum/AirFeedbackIcon'

/**
 * # 😄消息弹窗类
 * @author Hamm
 */
export class AirAlert {
  /** 
   * # 😄标题
   */
  protected title: string;

  /**
   * # 😄内容
   */
  protected content: string;

  /**
   * # 😄确认按钮文字
   */
  protected confirmText: string;

  /** 
   * # 😄取消按钮文字
   */
  protected cancelText!: string;

  /** 
   * # 😄可选的确认图标类型
   */
  protected icon: AirFeedbackIcon;

  /** 
   * # 😄是否启用HTML富文本
   */
  protected isHtmlEnabled = false

  /**
   * # 😄是否显示确认按钮
   */
  protected isConfirmButtonShow = true

  /**
   * # 😄是否显示右上角关闭按钮
   */
  protected isCloseButtonShow = true

  /**
   * # 😄是否esc可关闭
   */
  protected isCloseByEscape = false

  /**
   * # 😄是否遮罩层可关闭
   */
  protected isCloseByCover = false

  /** 
   * # 😄弹窗宽度
   */
  protected width = '';

  /** 
   * # 😄弹窗高度
   */
  protected height = '';

  /**
   * # 😄弹出消息框 使用DEMO如下
   * @param content [可选] 消息内容
   * 
   * ```javascript
   * try{
   *    await new AirAlert()
   *        .setTitle("确认提醒").setContent("是否确认继续操作？").setConfirmText("继续")
   *        .success();
   *    //接下来是确认后的操作代码
   * }catch(e){
   *    //接下来是取消操作后的代码
   * }
   * ```
   */
  constructor(content?: string) {
    this.title = '温馨提示'
    this.content = content || '操作成功!'
    this.confirmText = '确认'
    this.icon = AirFeedbackIcon.NONE
  }

  /**
   * # 😄设置Confirm标题
   * @param title 标题
   * @returns 
   */
  setTitle(title: string): this {
    this.title = title
    return this
  }

  /**
   * # 😄设置Confirm消息内容
   * @param content 内容
   * @returns 
   */
  setContent(content: string): this {
    this.content = content
    return this
  }

  /**
   * # 😄设置确认按钮文字
   * @param confirmText 确认按钮文字
   * @returns 
   */
  setConfirmText(confirmText: string): this {
    this.confirmText = confirmText
    return this
  }

  /**
   * # 😄允许使用不安全的HTML富文本
   * @returns 
   */
  enableHtml(): this {
    this.isHtmlEnabled = true
    return this
  }

  /**
   * # 😄是否隐藏确认按钮
   * @returns 
   */
  hideConfirm(): this {
    this.isConfirmButtonShow = false
    return this
  }

  /**
   * # 😄是否隐藏关闭按钮
   * @returns 
   */
  hideClose(): this {
    this.isCloseButtonShow = false
    return this
  }

  /**
   * # 😄设置弹窗宽度
   * @param width 宽度
   * @param isPercent [可选] 是否百分比 默认false
   * @returns 
   */
  setWidth(width: number, isPercent = false): this {
    if (isPercent) {
      this.width = `${width}%`
    } else {
      this.width = `${width}px`
    }
    return this
  }

  /**
   * # 😄设置弹窗高度
   * @param height 高度
   * @param isPercent [可选] 是否百分比 默认false
   * @returns 
   */
  setHeight(height: number, isPercent = false): this {
    if (isPercent) {
      this.height = `${height}%`
    } else {
      this.height = `${height}px`
    }
    return this
  }

  /**
   * # 😄显示成功消息提醒
   * @param content [可选] 消息内容
   * @returns 
   */
  success(content?: string): Promise<void> {
    if (content) {
      this.setContent(content)
    }
    this.icon = AirFeedbackIcon.SUCCESS
    return this.alert()
  }

  /**
   * # 😄显示警告消息提醒
   * @param content [可选] 消息内容
   * @returns 
   */
  warning(content?: string): Promise<void> {
    if (content) {
      this.setContent(content)
    }
    this.icon = AirFeedbackIcon.WARNING
    return this.alert()
  }

  /**
   * # 😄显示无图标的消息提醒
   * @param content [可选] 消息内容
   * @returns 
   */
  show(content?: string): Promise<void> {
    if (content) {
      this.setContent(content)
    }
    this.icon = AirFeedbackIcon.NONE
    return this.alert()
  }

  /**
   * # 😄显示错误消息提醒
   * @param content [可选] 消息内容
   * @returns 
   */
  error(content?: string): Promise<void> {
    if (content) {
      this.setContent(content)
    }
    this.icon = AirFeedbackIcon.ERROR
    return this.alert()
  }

  /**
   * # 😄显示信息类消息提醒
   * @param content [可选] 消息内容
   * @returns 
   */
  info(content?: string): Promise<void> {
    if (content) {
      this.setContent(content)
    }
    this.icon = AirFeedbackIcon.INFO
    return this.alert()
  }

  /**
   * # 😄 请不要直接调用这个方法
   * 你可以调用 ```.success()``` ```.info()``` ```.error()``` ```.warning()``` 来取代
   * @deprecated 
   * @returns 
   */
  private alert(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      ElMessageBox.alert(
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

  /**
   * # 😄 获取配置
   * @returns 
   */
  protected getConfig(): ElMessageBoxOptions {
    const customStyle: CSSProperties = {}
    if (this.width) {
      customStyle.width = this.width
    }
    if (this.height) {
      customStyle.height = this.height
    }
    return {
      showConfirmButton: this.isConfirmButtonShow,
      confirmButtonText: this.confirmText,
      cancelButtonText: this.cancelText,
      type: this.icon,
      draggable: true,
      dangerouslyUseHTMLString: this.isHtmlEnabled,
      customClass: this.isHtmlEnabled ? 'rich-text' : '',
      customStyle,
      showClose: this.isCloseButtonShow,
      closeOnClickModal: this.isCloseByCover,
      closeOnPressEscape: this.isCloseByEscape,
    }
  }
}
