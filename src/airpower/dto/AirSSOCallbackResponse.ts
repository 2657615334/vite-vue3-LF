import { Expose } from 'class-transformer'
import { AirModel } from '../model/AirModel'

/**
 * # 😄SSO回调响应
 * @author Hamm
 */

export class AirSSOCallbackResponse extends AirModel {
  @Expose()
  accessToken!: string;
}
