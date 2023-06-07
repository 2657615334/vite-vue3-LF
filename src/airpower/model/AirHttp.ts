import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, AxiosResponseHeaders, Method } from 'axios'
import { Ref } from 'vue'
import { AppConfig } from '../AppConfig'
import { AirNotification } from '../feedback/AirNotification'
import { AirHttpContentType } from '../enum/AirHttpContentType'
import { AirHttpMethod } from '../enum/AirHttpMethod'
import { AirCryptoHelper } from '../helper/AirCryptoHelper'
import { AirDateTimeHelper } from '../helper/AirDateTimeHelper'

/**
 * # 😄网络请求类
 * @author Hamm
 */
export class AirHttp {
  /**
   * # 😄基础返回对象
   */
  private axiosResponse!: Promise<AxiosResponse<any, any>>;

  /** 
   * # 😄基础请求配置
   */
  private axiosRequestConfig: AxiosRequestConfig = {};

  /** 
   * # 😄当前请求路径
   */
  private httpUrl = '';

  /** 
   * # 😄是否隐藏自动错误提示
   */
  private flagIgnoreError = false;

  /**
   * # 😄配置一个Loading的Ref对象
   */
  private loading!: Ref<boolean>

  /**
   * # 😄初始化一个AirHttp客户端
   * @param url [可选] 请求URL
   * 
    ```
    try{
        const result = await new AirHttp()
            //设置请求地址
            .setHttpUrl(this.baseUrl + "getUserInfo")
            //发送的数据
            .send(body.toSourceObject());
        //处理数据正确返回
    } catch(error){
        //处理错误信息
    }
    ```
   */
  constructor(url?: string) {
    this.axiosRequestConfig.method = <Method>AirHttpMethod.POST
    this.axiosRequestConfig.baseURL = AppConfig.apiRootUrl
    this.axiosRequestConfig.headers = {
      'content-type': AirHttpContentType.JSON,
    }
    const accessToken = AppConfig.getAccessToken()
    if (accessToken) {
      this.axiosRequestConfig.headers.authorization = accessToken
    }
    if (url) {
      this.httpUrl = url
    }
  }

  /**
   * # ⛔️ 仅供Service使用 ⛔️ 
   * ### 设置Loading的Ref对象
   * @param loading Loading的Ref
   * @returns 
   * @deprecated 
   * 
   */
  setLoading(loading: Ref<boolean>): this {
    this.loading = loading
    return this
  }

  /**
   * # 😄 设置请求接口路径 
   * 
   * @param url 请求的接口路径
   * @returns API
   * @deprecated 我们更建议直接通过构造传入
   */
  setHttpUrl(url: string): this {
    this.httpUrl = url
    return this
  }

  /**
   * # 😄设置请求头
   * @param header 请求头
   * @returns API
   */
  setHttpHeader(header: Record<string, string>): this {
    if (this.axiosRequestConfig.headers && this.axiosRequestConfig.headers['content-type']) {
      header = { ...header, 'content-type': this.axiosRequestConfig.headers['content-type'] }
    }
    this.axiosRequestConfig.headers = header as AxiosRequestHeaders
    return this
  }

  /**
   * # 😄添加一个请求头
   * @param key 请求头key
   * @param value 请求头value
   * @returns 
   */
  addHttpHeader(key: string, value: string): this {
    this.axiosRequestConfig.headers = this.axiosRequestConfig.headers || {} as AxiosResponseHeaders
    this.axiosRequestConfig.headers[key] = value
    return this
  }

  /**
   * # 😄设置请求方法
   * 支持直接调用 ```.post()``` ```.get()```
   * @param method 请求方法
   * @returns API
   */
  setHttpMethod(method: AirHttpMethod): this {
    this.axiosRequestConfig.method = <Method>method
    return this
  }

  /**
   * # 😄设置请求content-type
   * @param contentType content-type
   * @returns API
   */
  setContentType(contentType: AirHttpContentType): this {
    this.axiosRequestConfig.headers = { ...this.axiosRequestConfig.headers, 'content-type': contentType }
    return this
  }

  /**
   * # ⛔️ 我们不再推荐此方法 ⛔️
   * 
   * @see withOutError() 请使用此方法替代
   * @deprecated 
   */
  ignoreError(flag: boolean): this {
    this.flagIgnoreError = flag
    return this
  }

  /**
   * # ✅ 设置不自动弹出错误,自行处理 ✅
   * @returns 
   */
  withOutError(): this {
    this.flagIgnoreError = true
    return this
  }

  /**
   * # ⛔️ 我们不再推荐此方法 ⛔️
   * 
   * @see withOutToken() 请使用此方法替代
   * @deprecated 
   */
  ignoreToken(): this {
    if (this.axiosRequestConfig.headers && this.axiosRequestConfig.headers.authorization) {
      delete this.axiosRequestConfig.headers.authorization
    }
    return this
  }

  /**
   * # ✅ 不允许自动提交AccessToken ✅
   * @returns 
   */
  withOutToken(): this {
    if (this.axiosRequestConfig.headers && this.axiosRequestConfig.headers.authorization) {
      delete this.axiosRequestConfig.headers.authorization
    }
    return this
  }

  /**
   * # 😄发送请求
   * 
   * @param body [可选]请求体
   * @returns 成功实体
   * 
   * @see post() 直接发送POST
   * @see get() 直接发送GET
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  send(body?: any): Promise<any> {
    const json = JSON.stringify(body || {})
    if (AppConfig.defaultHttpAutoSign) {
      const timestamps = AirDateTimeHelper.getMilliTimeStamps()
      this.addHttpHeader('timestamps', timestamps.toString())
      /**
     * 计算当次请求的随机验证串 算法如下
     * nonce = sha1(TOKEN+"hold"+POST_BODY_JSON+"hope"+TIMESTAMPS+"cloud"+URL)
     */
      const nonce = AirCryptoHelper.sha1(`${AppConfig.getAccessToken()}hold${json}hope${timestamps}cloud${this.httpUrl}`)
      this.addHttpHeader('nonce', nonce)
    }
    if (this.loading) {
      this.loading.value = true
    }
    switch (this.axiosRequestConfig.method) {
      case AirHttpMethod.POST:
        this.axiosResponse = axios.post(this.httpUrl, body, this.axiosRequestConfig)
        break
      case AirHttpMethod.PUT:
        this.axiosResponse = axios.put(this.httpUrl, body, this.axiosRequestConfig)
        break
      case AirHttpMethod.PATCH:
        this.axiosResponse = axios.patch(this.httpUrl, body, this.axiosRequestConfig)
        break
      case AirHttpMethod.DELETE:
        this.axiosResponse = axios.delete(this.httpUrl, this.axiosRequestConfig)
        break
      default:
        this.axiosResponse = axios.get(this.httpUrl, this.axiosRequestConfig)
    }
    return new Promise((data, error) => {
      this.axiosResponse.then((res) => {
        if (this.loading) {
          this.loading.value = false
        }
        switch (res.data[AppConfig.defaultHttpGlobalCodeKey]) {
          case AppConfig.defaultHttpSuccessCode:
            data(res.data[AppConfig.defaultHttpGlobalDataKey])
            break
          case AppConfig.defaultHttpUnauthorizedCode:
            if (AppConfig.router) {
              if (this.flagIgnoreError) {
                error(res.data)
              } else {
                AppConfig.router.push('/login')
              }
            } else {
              new AirNotification()
              .setTitle('请先登录')
              .setMessage('请为@/airpower/app的AppConfig注入当前项目的路由')
              .error()
            }
            break
          default:
            if (!this.flagIgnoreError) {
              new AirNotification()
              .setTitle(AppConfig.debug ? (`${AppConfig.errorTitle}(${res.data[AppConfig.defaultHttpGlobalCodeKey]})`) : (AppConfig.errorTitle))
              .setMessage(res.data[AppConfig.defaultHttpGlobalMessageKey] || AppConfig.errorMessage)
              .error()
            }
            error(res.data)
        }
      }).catch((err) => {
        if (this.loading) {
          this.loading.value = false
        }
        if (!this.flagIgnoreError) {
          new AirNotification()
          .setTitle(AppConfig.debug ? (`${AppConfig.errorTitle}(CONSOLE)`) : (AppConfig.errorTitle))
          .setMessage(AppConfig.errorMessage)
          .error()
        }
        error(err)
      })
    })
  }

  /**
   * # 😁发送POST请求
   * @param body [可选]POST的数据
   * @returns 
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  post(body?: any): Promise<any> {
    this.setHttpMethod(AirHttpMethod.POST)
    return this.send(body)
  }

  /**
   * # 😁发送GET请求 只支持简单一维数据
   * @param params [可选]可携带的参数
   * @returns 
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get(params?: Record<string, any>): Promise<any> {
    if (params) {
      const queryArray = []
      for (const key in params) {
        queryArray.push(`${key}=${encodeURIComponent(params[key])}`)
      }
      if (this.httpUrl.includes('?')) {
        this.httpUrl += `&${queryArray.join('&')}`
      } else {
        this.httpUrl += `?${queryArray.join('&')}`
      }
    }
    this.setHttpMethod(AirHttpMethod.GET)
    return this.send()
  }
}
