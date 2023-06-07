import { AppConfig } from '../AppConfig'
import { AirNotification } from '../feedback/AirNotification'
import { AirMenu } from '../model/AirMenu'
import { AirConsoleHelper } from './AirConsoleHelper'
const modules = import.meta.glob('../../view/**/*.vue')
/**
 * # 😄Vue路由助手
 * @author Hamm
 */
export class AirRouterHelper {
  /**
   * # 😄将AirMenu菜单列表初始化到Vue路由中
   * @param menuList 菜单列表
   * @param parentRouter [可选] 父级路由 默认 admin
   * @param menuCacheKey [可选] 缓存Key 默认 AirPowerMenuList
   */
  static initVueRouter(menuList: AirMenu[], parentRouter = 'admin', menuCacheKey = 'AirPowerMenuList'): void {
    localStorage.setItem(menuCacheKey, JSON.stringify(menuList))
    if (!AppConfig.isTimeout) {
      this.addRouterAsync(menuList, parentRouter)
      this.reloadCacheMenuList(menuCacheKey)
    }
  }

  /**
   * # 😄将菜单添加到Vue路由中
   * @param menuList 菜单列表
   * @param parentRouter 父级路由名称
   * @returns
   */
  private static addRouterAsync(menuList: AirMenu[], parentRouter: string): void {
    if (!AppConfig.router) {
      new AirNotification().setTitle('配置错误').setMessage('请先向AppConfig注入当前路由对象').error()
      return
    }
    menuList.forEach((item) => {
      if (!item.children || item.children.length === 0) {
        if (AppConfig.router) {
          if (!item.name || !item.path || !item.component) {
            AirConsoleHelper.error('路由初始化失败，缺少参数')
          } else {
            AppConfig.router.addRoute(parentRouter, {
              path: item.path,
              name: item.id,
              meta: {
                name: item.name,
              },
              component: modules[`../../view${item.component}.vue`],
            })
          }
        }
      } else {
        this.addRouterAsync(item.children, parentRouter)
      }
    })
    console.log(AppConfig.router.getRoutes())
  }

  /**
   * # 😄重载缓存中的路由
   * @param menuCacheKey 提供缓存的Key
   * @param menuList [可选]子菜单,好兄弟,你不用传。
   * @returns
   */
  private static reloadCacheMenuList(menuCacheKey: string, menuList?: AirMenu[]): void {
    if (AppConfig.router) {
      if (!menuList && localStorage.getItem(menuCacheKey)) {
        menuList = JSON.parse(localStorage.getItem(menuCacheKey) || '[]')
      }
      if (menuList === undefined) {
        return
      }
      for (const item of menuList) {
        if (item.children.length > 0) {
          this.reloadCacheMenuList(menuCacheKey, item.children)
          continue
        }
        // eslint-disable-next-line no-restricted-globals
        const locationPathName = location.pathname
        if (item.path === locationPathName) {
          localStorage.removeItem(menuCacheKey)
          AppConfig.router.replace(locationPathName)
          break
        }
      }
    }
  }
}
