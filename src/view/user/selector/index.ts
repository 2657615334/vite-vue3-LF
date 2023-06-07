import { UserEntity } from '@/entity/UserEntity'
import { SelectorShow } from '@/airpower/component'
import Index from './index.vue'

/**
 * # 用户选择器
 * @param mult 是否多选
 * @param selectList 已选择的列表
 * @param search 搜索的条件 
 * @returns 用户[列表]
 */
export default function selector(mult = false, selectList?: UserEntity[], search?: UserEntity): Promise<UserEntity[] | UserEntity> {
  return SelectorShow(Index, mult, selectList, search) as Promise<UserEntity[] | UserEntity>
}
