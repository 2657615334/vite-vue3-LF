import { AppConfig } from '../AppConfig'
import { AirAbstractService } from './AirAbstractService'

/**
 * # 😄标准文件操作的Service
 * 
 * 如有自定义需求,可继承此类后override或扩展
 * @author Hamm
 */
export class AirFileService extends AirAbstractService {
  baseUrl = 'file';

  /**
   * # 获取上传文件的API地址
   * @returns 
   */
  getUploadUrl(): string {
    return `${AppConfig.apiRootUrl}${this.baseUrl}/uploadFile`
  }
}
