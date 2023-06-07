/**
 * # 😄用于页面公共用户控件的显示对象
 * @author Hamm
 */
export class AirUser {
  /** 
   * # 😄用户ID
   */
 
  id!: number;

  /** 
   * # 😄用户昵称
   */
 
  name!: string;

  /** 
   * # 😄用户头像
   */
 
  avatar!: string;

  /** 
   * # 😄扩展数据 JSON
   */
 
  extra!: Record<string, any>;

  /**
   * # 😄设置用户ID
   * @param id 用户ID
   * @returns 
   */
  setId(id: number): this {
    this.id = id
    return this
  }

  /**
   * # 😄设置显示的用户名
   * @param name 用户名
   * @returns 
   */
  setName(name: string): this {
    this.name = name
    return this
  }

  /**
   * # 😄设置头像
   * @param avatar 头像绝对地址
   * @returns 
   */
  setAvatar(avatar: string): this {
    this.avatar = avatar
    return this
  }

  /**
   * # 😄获取名字的第一个字
   * @returns 字符串
   */
  getShortName(): string {
    if (this.name) {
      return this.name.charAt(0)
    }
    return '吼'
  }
}
