import { Router } from 'vue-router'
import { AirDateTimeFormatter } from './enum/AirDateTimeFormatter'
import { AirHttpStatus } from './enum/AirHttpStatus'
import { INormalTreeProps } from './interface/INormalTreeProps'

/**
 * # 😄APP 配置
 * @author Hamm
 */
export class AppConfig {
  /**
   * # 😄当前版本号
   */
  static readonly version = 'v3.0.1'

  /**
   * # 😠超时时间 毫秒
   */
  static timeout = 5000

  /**
   * # 😄当前应用appId(后端提供)
   */
  static appId = ''

  /**
   * # 😄是否打开调试模式
   */
  static debug = false

  /**
   * # 😄Vue 路由
   */
  static router: Router

  /**
   * # 😄接口根地址
   */
  static homeUrl = import.meta.env.VITE_HOME_URL || 'https://www.holdhopecloud.com/'

  /**
   * # 😄接口根地址
   */
  static apiRootUrl = import.meta.env.VITE_API_URL || '/api/'

  /**
   * # 😄静态资源根路径
   */
  static staticUrl = import.meta.env.VITE_STATIC_URL || 'https://static.holdhopecloud.com/'

  /**
   * # 😄SSO地址
   */
  static ssoUrl = import.meta.env.VITE_SSO_URL || 'https://sso.holdhopecloud.com/'

  /**
   * # 😄标准错误提示标题
   */
  static errorTitle = '发生错误'

  /**
   * # 😄标准错误提示内容
   */
  static errorMessage = '系统发生了一些错误，请稍候再试 :)'

  /**
   * # 😄AccessToken在LocalStorage存储的key
   */
  static accessTokenKey = 'access_token'

  /**
   * # 😄最近访问的路径
   */
  static lastPathKey = 'air_last_path'

  /**
   * # 是否允许切换企业 默认允许
   * 如设置false 则菜单不显示切换企业按钮
   */
  static allowChangeTenant = true

  /**
   * # 😄设置上次访问的路径
   * @param path
   */
  static setLastPath(path: string): void {
    localStorage.setItem(this.lastPathKey, path)
  }

  /**
   * # 😄获取上次访问的路径
   * @returns
   */
  static getLastPath(): string {
    return localStorage.getItem(this.lastPathKey) || ''
  }

  /**
   * # 😄默认树结构配置数据
   */
  static defaultTreeProps: INormalTreeProps = {
    children: 'children',
    label: 'name',
  }

  /**
   * # 😄获取AccessToken
   * @returns AccessToken
   */
  static getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey) || ''
  }

  /**
   * # 😄存储AccessToken
   * @param accessToken AccessToken
   */
  static saveAccessToken(accessToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken)
  }

  /**
   * # 😄移除本地存储的AccessToken
   */
  static removeAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey)
  }

  /**
   *  # 😄最大数字
   */
  static maxNumber = 999999999999999

  /**
   *  # 😄最小数字
   */
  static minNumber = 0

  /**
   *  # 😄文本域最大长度
   */
  static maxTextAreaLength = 200

  /**
   *  # 😄文本最大长度
   */
  static maxTextLength = 50

  /**
   * # 😄是否访问超时
   */
  static isTimeout = false

  /**
   * # 😄文本域的最小行数
   */
  static defaultTextareaMinRows = 3

  /**
   * # 😄文本域的最大行数
   */
  static defaultTextareaMaxRows = 6

  /**
   * # 😄全局http请求返回code的key
   * 默认 "code"
   */
  static defaultHttpGlobalCodeKey = 'code'

  /**
   * # 😄全局http请求返回message的key
   * 默认 "message"
   */
  static defaultHttpGlobalMessageKey = 'message'

  /**
   * # 😄全局http请求返回data的key
   * 默认 "data"
   */
  static defaultHttpGlobalDataKey = 'data'

  /**
   * # 😄全局http请求返回成功状态码
   * 默认 200
   */
  static defaultHttpSuccessCode = AirHttpStatus.OK

  /**
   * # 😄全局http请求返回登录状态码
   * 默认 401
   */
  static defaultHttpUnauthorizedCode = AirHttpStatus.UNAUTHORIZED

  /**
   * # 😄全局http请求是否签名请求
   * 默认 401
   */
  static defaultHttpAutoSign = true

  /**
   * # 😄默认的格式化时间
   * 如设置,则未格式化方式的地方将默认使用此方式
   * ```
   * AppConfig.defaultDateTimeFormatter = AirDateTimeFormatter.YYYY_MM_DD
   * ```
   */
  static defaultDateTimeFormatter = AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss

  /**
   * # 权限列表
   */
  static permissionList: string[] = []

  /**
   * # 是否有权限
   * @param permission 权限标识
   * @returns
   */
  static hasPermission(permission: string): boolean {
    return this.permissionList.includes(permission)
  }

  /**
   * # 😄弹窗是否默认显示全屏按钮(默认true)
   * 此项仅为默认, 如手动传入, 此项将无效
   */
  static defaultDialogFullable = true

  /**
   * # 😄弹窗是否默认隐藏取消按钮(默认false)
   * 此项仅为默认, 如手动传入, 此项将无效
   */
  static defaultDialogHideCancel = false

  /**
   * # 😄普通文本输入是否默认显示长度限制标签(默认false)
   * 此项仅为默认, 如在装饰器中配置, 此项将无效
   */
  static defaultInputShowLimit = false

  /**
   * # 😄TextArea是否默认显示长度限制标签(默认true)
   * 此项仅为默认, 如在装饰器中配置, 此项将无效
   */
  static defaultTextAreaShowLimit = true

  /**
   * # 😄是否默认隐藏高级搜索(默认false)
   * 此项仅为默认, 如手动传入, 此项将无效
   */
  static defaultHideAdvanceSearch = false

  /**
   * # 😄普通关键词搜索的提示文本
   * 此项仅为默认, 如手动传入, 此项将无效
   */
  static defaultKeywordSearchPlaceholder = '请输入关键词搜索...'

  /**
   * # 😄分页组件默认使用的页码列表
   * 此项仅为默认, 如手动传入, 此项将无效
   */
  static defaultPageSizes = [20, 40, 60, 80, 100]
}
