import { App, Component, createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { AirExportModel } from '../model/AirExportModel'
import { AUpload } from '../component'
import ExportView from '../component/toolbar/Export.vue'
import { AirAbstractEntity } from '../dto/AirAbstractEntity'
import { AirAbstractRequest } from '../dto/AirAbstractRequest'
import { AirModel } from '../model/AirModel'
import { IUploadConfig } from '../interface/IUploadConfig'
import { IFile } from '../interface/IFile'

/**
 * # 😂弹窗助手类
 * @author Hamm
 */
export class AirDialogHelper {
  /**
  * # 😡弹出对话框的内部方法
  * @param view 使用的视图组件 传入一个import的vue
  * @param param 可选参数 将传入到合并到props上
  * @returns 
  */
  static async build<R>(view: Component, param: Record<string, any>): Promise<R> {
    const parentNode = document.createElement('div')
    const domId = `dialog_${Math.random()}`
    parentNode.setAttribute('id', domId)
    let app: App<Element> | undefined

    // 卸载dom的方法
    const unmount = () => {
      if (app) {
        app.unmount()
        document.body.removeChild(parentNode)
        app = undefined
      }
    }
    return new Promise<R>((resolve, reject) => {
      if (app) {
        return
      }

      const dialogParam = {
        onConfirm: async (p: R) => {
          unmount()
          resolve(p)
        },
        onCancel: () => {
          unmount()
          reject()
        },
        ...param,
      }
      /**
       * 创建App实例
       */
      app = createApp(view, dialogParam)
      app.use(ElementPlus, { locale: zhCn })

      // 注册全局组件
      Object.keys(Icons).forEach(key => {
        if (app) {
          app.component(key, Icons[key as keyof typeof Icons])
        }
      })

      document.body.appendChild(parentNode)
      // 挂载组件
      app.mount(parentNode)
    })
  }

  /**
   * # 😂弹出一个弹窗
   * @param view 使用的视图组件 传入一个import的vue
   * @param param 可选参数 将传入到目标对象的props.param参数上
   * @returns 
   */
  static async show(view: Component, param?: unknown): Promise<unknown> {
    return this.build(view, {
      param,
    })
  }

  /**
   * # 😄弹出上传文件对话框
   * @param config 上传配置
   * @param customConfirm 自定义确认按钮回调方法
   * @returns 
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static async showUpload(config?: IUploadConfig, customConfirm?: Function): Promise<IFile> {
    return this.build<IFile>(AUpload, {
      onCustomConfirm: () => {
        if (customConfirm) {
          customConfirm()
        }
      },
      ...config,
    })
  }

  /**
   * # 😄创建一个导出任务
   * @param url 接口地址
   * @param exportParam 导出request参数对象
   * @returns 
   */
  static async createExportTask<R extends AirAbstractRequest>(url: string, exportParam?: R): Promise<unknown> {
    const param = new AirExportModel()
    param.url = url
    param.param = exportParam || new AirModel() as AirAbstractRequest

    return this.show(ExportView, param)
  }

  /**
   * # 😂弹出一个选择器
   * @param view 使用的视图组件 传入一个import的vue
   * @param mult 可选参数 是否多选 将传入到目标对象的props.mult参数上
   * @param selectList 可选参数 已选列表 将传入到目标对象的props.selectList参数上
   * @param param 可选参数 普通参数 将传入到目标对象的props.param参数上
   * @returns 
   */
  static async selector(view: Component, mult = false, selectList?: AirAbstractEntity[], param?: unknown): Promise<unknown> {
    return this.build(view, {
      selectList,
      mult,
      param,
    })
  }
}
