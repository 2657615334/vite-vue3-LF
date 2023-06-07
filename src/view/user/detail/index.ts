import Index from './index.vue'
import { UserEntity } from '@/entity/UserEntity'
import { AirDialogHelper } from '@/airpower/helper'
/**
 * # 显示用户详情
 * @param user 用户
 * @returns 
 */
export default function detail(user: UserEntity): Promise<unknown> {
  return AirDialogHelper.show(Index, user)
}
