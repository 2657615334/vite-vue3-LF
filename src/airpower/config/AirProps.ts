/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PropType } from 'vue'
import { AirAbstractEntity } from '@/airpower/dto/AirAbstractEntity'
import { AirModel } from '../model/AirModel'

/**
 * # 😄使用无参DialogProps配置
 */
export function airProps() {
  return {
    /**
     * # 😄弹窗的确认按钮被点击事件
     * 如果给ADialog传入了form表单的ref实体对象, 则校验通过之后才会回调此方法
     */
    onConfirm: {
      type: Function,
      default: () => () => {
        console.log('On Confirm')
      },
    },
    /**
     * # 😄弹窗的取消或关闭按钮被点击事件
     */
    onCancel: {
      type: Function,
      default: () => () => {
        console.log('On Cancel')
      },
    },
  }
}

/**
 * # 😄使用ID的DialogProps配置
 */
export function airPropsId() {
  return Object.assign(airProps(), {
    /**
     * # 😄传入参数为一个Number的ID
     * 你可以直接拿这个ID去调用detail详情接口获取实体
     */
    param: {
      type: Number,
      default: () => 0,
    },
  })
}

/**
 * # 😄使用实体的DialogProps配置
 * - T: Param的类型
 */
export function airPropsParam<T extends AirModel>() {
  return Object.assign(airProps(), {
    /**
     * # 😄传入参数为一个实体
     * 
     * 能保证的是, 确实是一个实体的基类, 可以调用一些AirModel的方法
     * 
     * ```typescript
     * AirClassTransformerHelper.parse(props.param.toSourceObject(), UserEntity)
     * ```
     */
    param: {
      type: Object as PropType<T>,
      default: () => null,
    },
  })
}

/**
 * # 😄使用选择器的DialogProps配置
 * - S: selectList参数的类型
 * - P: param参数的类型
 */
export function airPropsSelector<S extends AirModel = AirAbstractEntity, P extends AirModel = AirAbstractEntity>() {
  return Object.assign(airProps(), {
    /**
     * # 😄是否使用多选
     */
    mult: {
      type: Boolean,
      default: false,
    },
    /**
     * # 😄已经选择了的实体列表数组
     * ! 仅在mult为true时会有值
     * 请放心使用ID属性, 其他的属性不一定有
     * 
     * 
     */
    selectList: {
      type: Array as PropType<S[]>,
      default: () => [] as PropType<S[]>,
    },
    /**
     * # 😄传入参数为一个实体
     * 
     * 能保证的是, 确实是一个实体的基类, 可以调用一些AirModel的方法
     * 
     * ```typescript
     * AirClassTransformerHelper.parse(props.param.toSourceObject(), UserEntity)
     * ```
     */
    param: {
      type: Object as PropType<P>,
      default: () => null,
    },
  })
}
