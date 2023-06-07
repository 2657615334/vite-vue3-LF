import { AirPlatformConfig } from '../dto/AirPlatformConfig'
import { AirClassTransformerHelper } from '../helper/AirClassTransformerHelper'
import { AirAbstractService } from './AirAbstractService'

/**
 * # 😄公共服务接口类
 * @author Hamm
 */
export class AirCommonService extends AirAbstractService {
  baseUrl!: string;

  /**
   * # 获取当前租户的平台配置
   * @returns
   */
  async getCurrentTenantLogoConfig(): Promise<AirPlatformConfig> {
    const result = await this.api('tenantConfiguration', 'configuration').post({})
    return AirClassTransformerHelper.parse(result, AirPlatformConfig)
  }
}
