import LogicFlow, { PolylineEdge } from '@logicflow/core'
import { Control, DndPanel, Menu, MiniMap, SelectionSelect } from '@logicflow/extension'
import { ClassConstructor } from 'class-transformer'
import { AirAbstractEntity } from '../dto/AirAbstractEntity'
import { AirFlowNodeView } from './AirFlowNodeView'
import { AirFlowNodeConfig } from './AirFlowNodeConfig'
import { AirFlowData } from './AirFlowData'
import { AirFlowLink } from './AirFlowLink'
import { AirFlowLinkModel } from './AirFlowLinkModel'
import { AirFlowLinkType } from './AirFlowLinkType'
import { AirFlowMenu } from './AirFlowMenu'
import { AirFlowNode } from './AirFlowNode'
import { AirFlowShortCut } from './AirFlowShortCut'

/**
 * # 标准节点视图接口
 * @author Hamm
 */
export interface IFlowNodeView<V extends AirFlowNodeView, C extends AirFlowNodeConfig> {
  type: string
  view: ClassConstructor<V>
  config: ClassConstructor<C>
}

/**
 * # Flow构建类
 * @author Hamm
 */
export class AirFlow<E extends AirAbstractEntity> {
  /**
   * # 流程图实例
   */
  instance!: LogicFlow

  /**
   * # 连线类型
   */
  type = AirFlowLinkType

  /**
   * # 连线数据模型
   */
  model = AirFlowLinkModel

  /**
   * # 节点画布视图
   */
  view = PolylineEdge

  /**
   * # 快捷键列表
   */
  shortcuts: AirFlowShortCut[] = []

  /**
   * # DOM节点
   */
  dom!: HTMLElement

  /**
   * # 节点菜单列表
   */
  nodeMenuList: AirFlowMenu[] = []

  /**
   * # 连线菜单列表
   */
  linkMenuList: AirFlowMenu[] = []

  /**
   * # 画布菜单列表
   */
  graphMenuList: AirFlowMenu[] = []

  /**
   * # 初始化一个流程图组件
   * @param dom DOM ref
   */
  constructor(dom: HTMLElement) {
    this.dom = dom
  }

  /**
   * # 设置快捷键 😡请在创建实例之前调用
   * @param shortcuts 
   * @returns 
   */
  setShortCuts(...shortcuts: AirFlowShortCut[]): this {
    this.shortcuts = shortcuts
    return this
  }

  /**
   * # 节点列表
   */
  nodeList: AirFlowNode<E>[] = []

  /**
   * # 连线列表
   */
  linkList: AirFlowLink[] = []

  /**
   * # 流程图数据
   */
  flowData: AirFlowData<E> = new AirFlowData()

  /**
   * # 流程图使用的View列表
   */
  nodeViewTypeList: IFlowNodeView<any, any>[] = []

  /**
   * # 创建流程图实例
   * @param readonly 是否只读
   * @returns 
   */
  createInstance(readonly = false): this {
    LogicFlow.use(Menu)
    LogicFlow.use(MiniMap)
    LogicFlow.use(DndPanel)
    LogicFlow.use(SelectionSelect)
    LogicFlow.use(Control)
    this.instance = new LogicFlow({
      stopZoomGraph: true,
      stopScrollGraph: true,
      container: this.dom,
      style: this.theme,
      grid: this.grid,
      width: 2000,
      height: 2000,
      keyboard: {
        enabled: !readonly,
        shortcuts: this.shortcuts as any,
      },
      plugins: [Menu, SelectionSelect],
      isSilentMode: readonly,
    })
    return this
  }

  /**
   * # 渲染
   */
  update(): void {
    this.instance.extension.menu.setMenuConfig({
      nodeMenu: this.nodeMenuList,
      edgeMenu: this.linkMenuList,
      graphMenu: this.graphMenuList,
    })
    this.instance.register(this)
    for (const view of this.nodeViewTypeList) {
      this.instance.register({
        type: view.type,
        view: view.view,
        model: view.config,
      })
    }
    this.instance.setDefaultEdgeType(this.type)
    this.instance.render(this.flowData)
  }

  /**
   * 主题配置
   */
  theme = {
    arrow: {
      offset: 10, // 箭头长度
      verticalLength: 3, // 箭头垂直于边的距离
      fill: 'none',
      stroke: '#ff4500',
    },
    baseEdge: {
      strokeWidth: 2,
      stroke: '#ff4500',
    },
    animationDuration: '10s',
    strokeDasharray: '3,3',
  }

  /**
   * 背景矩阵
   */
  grid = {
    size: 5,
    visible: true,
    type: 'dot',
    config: {
      color: '#f8f8f8',
      thickness: 1,
    },
  }
}
