/**
 * # 😄为类标记配置
 * @author Hamm
 */
export interface IEntityConfig {
  /**
   * # 😄关键词搜索是否全局隐藏
   * 如设置true 则 ```AToolBar``` 传入的 ```hideSearch``` 失效
   */
  hideKeywordSearch?: boolean;

  /**
   * # 😄关键词搜索提示文案
   * 如 ```AToolBar``` 传入了 ```searchPlaceholder``` 则此项失效
   */
  keywordSearchPlaceholder?: string;

  /**
   * # 😄高级搜索搜索是否隐藏
   * 如设置true 则 ```AToolBar``` 传入的 ```hideAdvanceSearch``` 失效
   */
  hideAdvanceSearch?: boolean;

  /**
   * # 😄新增按钮的标题
   * 如 ```AToolBar``` 传入 ```addTitle``` , 则此项失效
   */
  addTitle?: string;

  /**
   * # 😄添加权限标识
   * 如 ```AToolBar``` 传入 ```addPermission``` , 则此项失效
   */
  addPermission?: string;

  /**
   * # 😄导出权限标识
   * 如 ```AToolBar``` 传入 ```exportPermission``` , 则此项失效
   */
  exportPermission?: string;

  /**
   * # 😄导入权限标识
   * 如 ```AToolBar``` 传入 ```importPermission``` , 则此项失效
   */
  importPermission?: string;

  /**
   * # 😄表格的没有数据时的提示文本
   * 如 ```ATable``` 传入 ```emptyText``` , 则此项失效
   */
  tableEmptyText?: string;

  /**
   * # 😄编辑权限标识
   * 如 ```ATable``` 传入 ```editPermission``` , 则此项失效
   */
  editPermission?: string;

  /**
   * # 😄详情权限标识
   * 如 ```ATable``` 传入 ```detailPermission``` , 则此项失效
   */
  detailPermission?: string;

  /**
   * # 😄删除权限标识
   * 如 ```ATable``` 传入 ```deletePermission``` , 则此项失效
   */
  deletePermission?: string;

  /**
   * # 😄添加子项目权限标识
   * 如 ```ATable``` 传入 ```addPermission``` , 则此项失效
   */
  addChildPermission?: string;

  /**
   * # 😄全局隐藏字段列选择器
   * 如设置true, 则 ```ATable``` 传入的 ```hideFieldSelector``` 失效
   */
  hideFieldSelector?: boolean;
}
