/**
 * # 😄菜单模型
 * @author Hamm
 */
export class AirMenu {
  /** 
   * # 😄菜单名称
   */

  name!: string;

  /** 
   * # 😄菜单URL
   */

  path!: string;

  /** 
   * # 😄菜单图标
   */

  icon!: string;

  /** 
   * # 😄子菜单
   */

  children: AirMenu[] = [];

  /** 
   * # 😄菜单ID
   */

  id!: string;

  /** 
   * # 😄菜单绑定组件路径
   */

  component!: string;

  /** 
   * # 😄菜单是否隐藏
   */

  isHide = false

  /**
   * # 😄实例化一个菜单类 
   * 默认自己生成ID
   */
  constructor() {
    // TODO 暂时用自己生成唯一ID
    this.id = Math.random().toString()
  }

  /**
   * # 😄设置ID
   * @param id ID
   * @returns 菜单实例
   */
  setId(id: string): this {
    this.id = id
    return this
  }

  /**
   * # 😄设置菜单名称
   * @param name 名称
   * @returns 菜单实例
   */
  setName(name: string): this {
    this.name = name
    return this
  }

  /**
   * # 😄设置菜单实例
   * @param path 路径
   * @returns 菜单实例
   */
  setPath(path: string): this {
    this.path = path
    this.component = path
    return this
  }

  /**
   * # 😄设置菜单实例
   * @param icon 图标
   * @returns 菜单实例
   */
  setIcon(icon: string): this {
    this.icon = icon
    return this
  }

  /**
   * # 😄设置子菜单列表
   * @param children 子菜单列表
   * @returns 菜单实例
   */
  setChildren(children: AirMenu[]): this {
    this.children = children
    return this
  }

  /**
   * # 😄设置菜单组件路径
   * @param component 组件路径
   * @returns 菜单实例
   */
  setComponent(component: string): this {
    this.component = component
    return this
  }

  /**
   * # 😄设置菜单是否隐藏
   * @param hide 默认false
   * @returns 
   */
  setHide(hide = false): this {
    this.isHide = hide
    return this
  }
}
