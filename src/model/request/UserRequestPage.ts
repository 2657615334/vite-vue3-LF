/* @Author: Yi Handong 2657615334@qq.com
   @Date: 2022-12-10 18:41:50
   @LastEditors: Yi Handong 2657615334@qq.com
   @LastEditTime: 2023-04-03 10:54:23
   @FilePath: \Demo\src\model\request\UserRequestPage.ts
   @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE */
import { Expose, Type } from 'class-transformer'
import { AirAbstractRequestPage } from '@/airpower/dto/AirAbstractRequestPage'
import { UserEntity } from '@/entity/UserEntity'

/**
 * 用户分页请求对象
 * @author Hamm
 */
export class UserRequestPage extends AirAbstractRequestPage {
  /** 查询参数 */
  @Type(() => UserEntity)
  @Expose()
  queryParams!: UserEntity | undefined;
}
