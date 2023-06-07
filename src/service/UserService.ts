import { BaseAbstractService } from '@/base/BaseAbstractService'

export class UserService extends BaseAbstractService {
  // 当前服务目录
  baseUrl = 'user';

  async getById(): Promise<void> {
    await this.api('login').send()
  }
}
