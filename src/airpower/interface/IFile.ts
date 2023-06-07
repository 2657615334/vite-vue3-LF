/**
 * # 😄文件标准格式接口
 * @author Hamm
 */
export interface IFile {
  /**
   * # 😄文件ID
   */
  id: number

  /**
   * # 😄文件名称
   */
  fileName: string

  /**
   * # 😄文件类型
   */
  fileType: string

  /**
   * # 😄文件hash
   */
  hashCode: string

  /**
   * # 😄文件大小(字节)
   * 可以调用 ```AirFileHelper.getFileSizeFriendly()``` 格式化为友好显示文本
   */
  size: number

  /**
   * # 😄文件真实地址
   */
  url: string

  /**
   * # 😄创建时间
   */
  createdTime: number
}
