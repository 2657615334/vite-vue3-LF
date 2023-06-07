import { Expose } from 'class-transformer'
import { AirAbstractEntity } from './AirAbstractEntity'

/**
 * # 😄 默认应用模型
 * @author Hamm
 */
export class AirAppEntity extends AirAbstractEntity {
    @Expose() id!: number

    /**
     * # 😄应用的父级ID
     */
    @Expose() parentId!: number

    @Expose() createdId!: number

    @Expose() createdTime!: number

    @Expose() createdBy!: string

    @Expose() remark!: string

    /**
     * # 😄应用名称
     */
    @Expose() appName!: string

    /**
     * # 😄域名
     */
    @Expose() domain!: string

    /**
     * # 😄应用编码
     */
    @Expose() appCode!: string
}
