/**
 * # 😄标注树结构实体接口
 * @author Hamm
 */
export interface ITree {
  /**
   * # 😄ID
   */
  id: number

  /**
   * # 😄父节点ID
   */
  parentId: number

  /**
   * # 😄名称
   */
  name: string

  /**
   * # 😄标签
   */
  tag: string

  /**
   * # 😄树的子节点
   */
  children: ITree[]
}
