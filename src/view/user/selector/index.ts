import { UserEntity } from '@/entity/UserEntity'
import Index from './index.vue'
import { AirDialogHelper } from '@/airpower/helper'
AirDialogHelper
/**
 * # 用户选择器
 * @param mult 是否多选
 * @param selectList 已选择的列表
 * @param search 搜索的条件
 * @returns 用户[列表]
 */
export default function selector(
  mult = false,
  selectList?: UserEntity[],
  search?: UserEntity,
): Promise<UserEntity[] | UserEntity> {
  return AirDialogHelper.selector(Index, mult, selectList, search) as Promise<UserEntity[] | UserEntity>
}
