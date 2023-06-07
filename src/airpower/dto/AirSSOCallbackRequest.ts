import { Expose } from 'class-transformer'
import { AirModel } from '../model/AirModel'

/**
 * # 😄SSO回调请求
 * @author Hamm
 */

export class AirSSOCallbackRequest extends AirModel {
  @Expose() code!: string;
}
