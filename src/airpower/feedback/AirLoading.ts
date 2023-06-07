import { ElLoading } from 'element-plus'

/**
 * # 😄通知基类
 * @author Hamm
 */
export class AirLoading {
  /**
   * # 😄Loading实例
   */
  private instance: any

  /** 
   * # 😄Loading文字
   */
  private message = '';

  /** 
   * # 😄加载目标
   */
  private target: string | unknown = document.body;

  /** 
   * # 😄是否全屏
   */
  private fullscreen = true;

  /**
   * # 😄背景色 
   */
  private background = 'rgba(255,255,255,0.9)';

  /** 
   * # 😄是否锁定
   */
  private isLock = false;

  /**
   * # 😄实例一个LoadingService 可传入DomID
   * ```javascript
   * const loading = new AirLoading()
   *      .setMessage("loading")
   *      .setFullScreen(true)
   *      .setBackground("rgba(255,255,255,0.9)")
   *      .setLock(true)
   *      .show();
   * loading.close();//关闭loading
   * ```
   * @param domId [可选]DOMID 可选参数
   */
  constructor(domId?: string) {
    this.message = '加载中'
    if (domId) {
      this.target = domId
    }
  }

  /**
   * # 😄设置是否全屏
   * @param isFullScreen 是否全屏 默认true
   * @returns 
   */
  setFullScreen(isFullScreen: boolean): this {
    this.fullscreen = isFullScreen
    return this
  }

  /**
   * # 😄设置背景色 
   * @param backgroud 背景色 RGB/RGBA/#333
   * @returns 
   */
  setBackground(backgroud: string): this {
    this.background = backgroud
    return this
  }

  /**
   * # 😄设置加载文字
   * @param message 文字
   * @returns 实例
   */
  setMessage(message: string): this {
    this.message = message
    return this
  }

  /**
   * # 😄设置锁定
   * @param isLock 是否锁定
   * @returns 
   */
  setLock(isLock: boolean): this {
    this.isLock = isLock
    return this
  }

  /**
   * # 😄弹出这个Loading
   * @param message [可选]Loading文案
   * @returns 弹出Loading
   */
  show(message?: string): this {
    if (message) {
      this.setMessage(message)
    }
    const options: Record<string, any> = {
      background: this.background,
      lock: this.isLock,
      text: this.message,
      fullscreen: this.fullscreen,
    }
    if (this.target) {
      options.target = this.target
    }
    this.instance = ElLoading.service(options)
    return this
  }

  /**
   * # 关闭Loading
   */
  close():void {
    if (this.instance) {
      this.instance.close()
    }
  }
}
