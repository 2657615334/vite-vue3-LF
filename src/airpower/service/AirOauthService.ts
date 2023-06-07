import { ClassConstructor } from 'class-transformer'
import { AppConfig } from '../AppConfig'
import { AirAbstractEntity } from '../dto/AirAbstractEntity'
import { AirAppEntity } from '../dto/AirAppEntity'
import { AirMenuTreeEntity } from '../dto/AirMenuTreeEntity'
import { AirSSOCallbackRequest } from '../dto/AirSSOCallbackRequest'
import { AirSSOCallbackResponse } from '../dto/AirSSOCallbackResponse'
import { AirNotification } from '../feedback/AirNotification'
import { AirClassTransformerHelper } from '../helper/AirClassTransformerHelper'
import { AirMenu } from '../model/AirMenu'
import { AirAbstractService } from './AirAbstractService'

/**
 * # 😄标准Oauth相关操作的Service
 * 
 * 如有自定义需求,可继承此类后override或扩展
 * @author Hamm
 */
export class AirOauthService extends AirAbstractService {
  baseUrl = 'oauth'

  /**
   * 获取当前用户的个人信息
   * @param clazz 实体类
   * @returns 
   */
  async getCurrentUserInfo<T extends AirAbstractEntity>(clazz: ClassConstructor<T>): Promise<T> {
    try {
      const result = await this.api('info', 'user').withOutError()
      .post()
      return AirClassTransformerHelper.parse(result, clazz)
    } catch (e) {
      switch ((e as Record<string, any>).code) {
        case 401:
          if (AppConfig.router) {
            AppConfig.router.push('/login')
          } else {
            new AirNotification().setTitle('无权访问')
            .setMessage('请先为AppConfig注入router配置')
            .error()
          }
          break
        case 403:
          if (AppConfig.router) {
            AppConfig.router.push('/403')
          } else {
            new AirNotification().setTitle('无权访问')
            .setMessage('请先为AppConfig注入router配置')
            .error()
          }
          break
        case 404:
          if (AppConfig.router) {
            AppConfig.router.push('/')
          } else {
            new AirNotification().setTitle('请先登录')
            .setMessage('请先为AppConfig注入router配置')
            .error()
          }
          break
        default:
          if (AppConfig.router) {
            AppConfig.router.push('/500')
          } else {
            new AirNotification().setTitle('发生错误')
            .setMessage('请先为AppConfig注入router配置')
            .error()
          }
      }
      throw new Error()
    }
  }

  /**
   * 获取AccessToken
   * @param code Code
   * @returns SSO response对象
   */
  async getAccessToken(code: string): Promise<AirSSOCallbackResponse> {
    const request = new AirSSOCallbackRequest()
    request.code = code
    const result = await this.api('callback').post(request)
    return AirClassTransformerHelper.parse(result, AirSSOCallbackResponse)
  }

  /**
   * 退出登录
   * @returns 
   */
  async logout(): Promise<void> {
    return this.api('logout', 'user').post()
  }

  /**
   * 获取菜单列表
   * @returns 
   */
  async getMenuTreeList(): Promise<AirMenuTreeEntity[]> {
    const result = await this.api('menuTreeList', 'user').post()
    return AirClassTransformerHelper.parse(result, AirMenuTreeEntity) as unknown as AirMenuTreeEntity[]
  }

  /**
   * # 获取当前用户的权限列表
   * @returns
   */
  async getCurrentUserPermissions(): Promise<string[]> {
    return this.api('permissions', 'user').post()
  }

  /**
   * # 将菜单实体转换到AirPower使用的AirMenu上
   * @param entities 实体列表
   * @returns 
   */
  getAirMenuListFromEntity(entities: AirMenuTreeEntity[]): AirMenu[] {
    const airMenuList: AirMenu[] = []
    for (const entity of entities) {
      let children: AirMenu[] = []
      if (entity.children && entity.children.length > 0) {
        children = this.getAirMenuListFromEntity(entity.children)
      }
      const airMenu = new AirMenu().setId(entity.id.toString())
      .setName(entity.name)
      .setPath(entity.path)
      .setComponent(entity.component)
      .setChildren(children)
      .setIcon(entity.icon)
      airMenuList.push(airMenu)
    }
    return airMenuList
  }

  /**
   * 获取菜单列表
   * @returns 
   */
  async getAppList(): Promise<AirAppEntity[]> {
    const result = await this.api('appList', 'user').post()
    return AirClassTransformerHelper.parse(result, AirAppEntity) as unknown as AirAppEntity[]
  }
}
