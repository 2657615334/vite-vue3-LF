import { AirAbstractEntity } from '../dto/AirAbstractEntity'
import { AirFlowLink } from './AirFlowLink'
import { AirFlowNode } from './AirFlowNode'

/**
 * # 流程图数据类
 * @author Hamm
 */
export class AirFlowData<E extends AirAbstractEntity> {
    /**
     * # 节点列表
     */
    nodes: AirFlowNode<E>[] = []

    /**
     * # 连线列表
     */
    edges: AirFlowLink[] = []
}
