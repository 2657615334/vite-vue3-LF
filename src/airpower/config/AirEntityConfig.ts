import { Expose } from 'class-transformer'
import { IEntityConfig } from '../interface/IEntityConfig'

/**
 * # 😄为类标记配置的实现类
 */
export class AirEntityConfig implements IEntityConfig {
@Expose() hideKeywordSearch?= false

@Expose() keywordSearchPlaceholder?: string

@Expose() hideAdvanceSearch?= false

@Expose() addTitle?: string

@Expose() addPermission?: string

@Expose() exportPermission?: string

@Expose() importPermission?: string

@Expose() tableEmptyText?: string

@Expose() addChildPermission?: string

@Expose() detailPermission?: string

@Expose() deletePermission?: string

@Expose() editPermission?: string

@Expose() hideFieldSelector?= false
}
