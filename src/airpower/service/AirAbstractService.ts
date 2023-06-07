/* eslint-disable no-unused-vars */
import { ClassConstructor } from 'class-transformer'
import { Ref } from 'vue'
import { AirAbstractRequest } from '../dto/AirAbstractRequest'
import { AirAlert } from '../feedback/AirAlert'
import { AirNotification } from '../feedback/AirNotification'
import { AirClassTransformerHelper } from '../helper/AirClassTransformerHelper'
import { AirHttp } from '../model/AirHttp'
import { AirModel } from '../model/AirModel'

/**
 * # 😂AirAbstractService基类
 * @author Hamm
 */
export abstract class AirAbstractService {
  /** 
   * # 😄API目录地址
   */
  abstract baseUrl: string;

  /**
   * # Loading的ref对象
   */
  protected loading!: Ref<boolean>

  /**
   * # 😄获取一个Service实例
   * @param loading [可选]Loading的Ref对象
   */
  constructor(loading?: Ref<boolean>) {
    if (loading) {
      this.loading = loading
    }
  }

  /**
   * # ⛔️ 我们不再推荐使用此方法 ⛔️
   * 
   * ### 你可以使用 ```this.api("")```代替
   * 
   * @see api()
   * @deprecated 
   */
  init(url: string): AirHttp {
    if (this.loading) {
      return new AirHttp(url).setLoading(this.loading)
    }
    return new AirHttp(url)
  }

  /**
   * # ✅ 发起一个API网络请求 ✅
   * - ### ```url``` 请求的API地址
   * - ### ```customBaseUrl``` [可选]API地址前缀,无需```/```结尾
   * 
   * ```
   * // 如不传入 customBaseUrl, 则默认使用当前Service的baseUrl
   * ```
   * @returns AirHttp客户端
   */
  api(url: string, customBaseUrl?: string): AirHttp {
    if (customBaseUrl) {
      url = `${customBaseUrl}/${url}`
    } else {
      url = `${this.baseUrl}/${url}`
    }
    if (this.loading) {
      return new AirHttp(url).setLoading(this.loading)
    }
    return new AirHttp(url)
  }

  /**
   * # 😄查询分页原始数据
   * @param request 请求对象
   * @returns 分页原始数据
   */
  async getListSourceData(request: AirAbstractRequest): Promise<any> {
    return this.api('page').post(request.toSourceObject())
  }

  /**
   * # 😄查询分页数据
   * @param request 请求对象
   * @param clazz 转换到的类
   * @returns 分页数据对象
   */
  async getListData<E extends AirModel>(request: AirAbstractRequest, clazz: ClassConstructor<E>): Promise<E> {
    const result: Record<string, any> = await this.api('page').post(request.toSourceObject())
    return AirClassTransformerHelper.parse(result, clazz)
  }

  /**
   * # 😄查询所有数据
   * @param request 请求对象
   * @param clazz 转换到的类
   * @returns 分页数据对象
   */
  async getAllData<E extends AirModel>(request: AirAbstractRequest, clazz: ClassConstructor<E>): Promise<E[]> {
    const result: Record<string, any>[] = await this.api('list').post(request.toSourceObject())
    return AirClassTransformerHelper.parse(result, clazz) as unknown as E[]
  }

  /**
   * # 😄查询树结构数据数组
   * @param request 请求对象
   * @param clazz 转换类
   * @returns 
   */
  async getTreeList<E extends AirModel>(request: AirAbstractRequest, clazz: ClassConstructor<E>): Promise<E[]> {
    const result: Record<string, any> = await this.api('treeList').post(request.toSourceObject())
    return AirClassTransformerHelper.parse(result, clazz) as unknown as E[]
  }

  /**
   * # 😄根据ID获取详情对象
   * @param id ID
   * @param clazz 转换类型
   * @returns 详情对象
   */
  async getDetailById<E extends AirModel>(id: number, clazz: ClassConstructor<E>): Promise<E> {
    const result: Record<string, any> = await this.api('get').post({ id })
    return AirClassTransformerHelper.parse(result, clazz)
  }

  /**
   * # 😄保存一条新的数据
   * @param data 保存的数据
   * @param message [可选]新增成功的消息提示内容
   * @param title [可选]新增成功的消息提示标题 默认 '新增成功'
   * @returns 保存成功后的主键ID
   */
  async saveData<E extends AirModel>(data: E, message?: string, title = '新增成功'): Promise<number> {
    const result: Record<string, any> = await this.api('save').post(data.toSourceObject())
    if (message) {
      new AirNotification().setTitle(title)
      .setMessage(message)
      .success()
    }
    return result.id
  }

  /**
   * # 😄修改一条数据
   * @param data 修改的数据实体
   * @param message [可选]修改成功的消息提示内容
   * @param title [可选]修改成功的消息提示标题 默认 '修改成功'
   * @returns 
   */
  async updateData<E extends AirModel>(data: E, message?: string, title = '修改成功'): Promise<void> {
    await this.api('update').post(data.toSourceObject())
    if (message) {
      new AirNotification().setTitle(title)
      .setMessage(message)
      .success()
    }
  }

  /**
   * # 😄根据ID删除一条数据
   * @param data 删除的数据
   * @param message [可选]删除成功的消息提示内容
   * @param title [可选]删除成功的消息提示标题 默认 '删除成功'
   * @returns 
   */
  async deleteById(id: number, message?: string, title = '删除成功'): Promise<void> {
    return this.api('delete').withOutError()
    .post([{ id }])
    .then(() => {
      if (message) {
        new AirNotification().setTitle(title)
        .setMessage(message)
        .success()
      }
    })
    .catch((err) => {
      new AirAlert()
      .setTitle('删除失败')
      .setContent(err.message)
      .setConfirmText('确定')
      .error()
    })
  }

  /**
   * # 😄根据ID数组批量删除数据
   * @param ids 删除的数据
   * @param message [可选]删除成功的消息提示内容
   * @param title [可选]删除成功的消息提示标题 默认 '删除成功'
   * @returns 
   */
  async deleteByIds(ids: number[], message?: string, title = '删除成功'): Promise<void> {
    return this.api('delete').withOutError()
    .post(ids.map(id => ({ id })))
    .then(() => {
      if (message) {
        new AirNotification().setTitle(title)
        .setMessage(message)
        .success()
      }
    })
    .catch((err) => {
      new AirAlert()
      .setTitle('删除失败')
      .setContent(err.message)
      .setConfirmText('确定')
      .error()
    })
  }
}
