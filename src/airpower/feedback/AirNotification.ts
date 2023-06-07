import { ElNotification } from 'element-plus'
import { AirFeedbackIcon } from '../enum/AirFeedbackIcon'

/**
 * # 😄通知基类
 * @author Hamm
 */
export class AirNotification {
  /** 
   * # 😄通知标题
   */
  private title = '';

  /** 
   * # 😄通知内容
   */
  private message = '';

  /** 
   * # 😄通知默认保留时长
   */
  private duration = 2000;

  /**
   * # 😄初始化一个通知
    ```
    //弹出错误信息的方式 code可选 默认500
    new AirNotification().setMessage("我警告你不要搞事情").setTitle("警告的标题").warning();
    new AirNotification().warning("我警告你不要搞事情","警告的标题");
    ```
   */
  constructor() {
    this.title = '系统提示'
    this.message = '你并没有传入具体的错误信息：）'
  }

  /**
   * # 😄设置标题
   * @param title 标题
   * @returns 实例
   */
  setTitle(title: string): this {
    this.title = title
    return this
  }

  /**
   * # 😄设置消息
   * @param message 消息
   * @returns 实例
   */
  setMessage(message: string): this {
    this.message = message
    return this
  }

  /**
   * # 😄设置自动关闭时间
   * @param duration 自动关闭时间
   * @returns 实例
   */
  setDuration(duration: number): this {
    this.duration = duration
    return this
  }

  /**
   * # 😄警告通知
   * 
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   * @returns 是否点击了通知
   */
  async warning(message?: string, title?: string): Promise<boolean> {
    if (message) {
      this.setMessage(message)
    }
    if (title) {
      this.setMessage(title)
    }
    return this.show(AirFeedbackIcon.WARNING)
  }

  /**
   * # 😄成功通知
   * 
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   * @returns 是否点击了通知
   */
  async success(message?: string, title?: string): Promise<boolean> {
    if (message) {
      this.setMessage(message)
    }
    if (title) {
      this.setMessage(title)
    }
    return this.show(AirFeedbackIcon.SUCCESS)
  }

  /**
   * # 😄信息通知
   * 
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   * @returns 是否点击了通知
   */
  async info(message?: string, title?: string): Promise<boolean> {
    if (message) {
      this.setMessage(message)
    }
    if (title) {
      this.setMessage(title)
    }
    return this.show(AirFeedbackIcon.INFO)
  }

  /**
   * # 😄错误通知
   * 
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   * @returns 是否点击了通知
   */
  async error(message?: string, title?: string): Promise<boolean> {
    if (message) {
      this.setMessage(message)
    }
    if (title) {
      this.setTitle(title)
    }
    return this.show(AirFeedbackIcon.ERROR)
  }

  /**
   * # ⛔️ 显示通知 ⛔️
   * 
   * 如用户点击了通知 返回true 否则false
   * @param type 可选枚举通知类型
   * @deprecated 
   * @see success() 
   * @see warning() 
   * @see error() 
   * @see info() 
   */
  private async show(type: AirFeedbackIcon): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      ElNotification({
        title: this.title,
        message: this.message,
        type,
        duration: this.duration,
        onClose: () => {
          resolve(false)
        },
        onClick: () => {
          resolve(true)
        },
      })
    })
  }
}
