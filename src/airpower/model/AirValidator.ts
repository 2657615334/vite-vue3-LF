/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */

import { AirValidatorHelper } from '../helper/AirValidatorHelper'

/** 
 * # 😄表单验证配置 
 * @author Hamm
 * */
export class AirValidator {
  /**
   * # 😄类型 默认string
   * 可通过 ```toString``` ```toNumber``` ```toArray```设置
   */
  type!: string

  /**
   * # 😄触发方式(默认blur)
   * 不建议直接设置哦~ 
   * 你可以调用 ```.whenChange()``` 改为变更即校验
   * @deprecated
   */
  trigger: 'blur' | 'change' = 'blur'

  /**
   * # 😄错误提醒 
   * 请通过 ```.show()``` 传入
   * 不建议直接设置哦~ 
   * @deprecated
   */
  message!: string

  /**
   * # 😄是否必填 
   * 可以调用 ```.ifEmpty()```
   * 不建议直接设置哦~ 
   * @deprecated
   */
  required = false

  /**
   * # 😄自定义验证器 
   * 请调用 ```.setCustomValidator()```
   * 不建议直接设置哦~
   * @deprecated
   */
  validator!: (rule: any, value: any, callback: Function) => void

  /**
   * # 😄转换验证数据为数组
   * @returns 
   */
  toArray(): this {
    this.type = 'array'
    return this
  }

  /**
   * # 😄转换验证数据为数字
   * @returns 
   */
  toNumber(): this {
    this.type = 'number'
    return this
  }

  /**
   * # 😄转换验证数据为字符串
   * @returns 
   */
  toString(): this {
    this.type = 'string'
    return this
  }

  /**
   * # 😄转换验证数据为日期
   * @returns 
   */
  toDate(): this {
    this.type = 'date'
    return this
  }

  /**
   * # 😄显示错误信息
   * @param message 验证失败提醒文案
   */
  show(message?: string): this {
    if (message) {
      this.message = message
    }
    return this
  }

  /**
   * # 😄不允许的内容
   * @param str 内容
   * @returns 
   */
  ifEquals(str: string): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (value && value == str) {
        callback(this.message || `输入的内容不能是${str}`)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 😄字符长度少于多少时报错
   * @param min 最小值
   */
  ifLengthLessThan(min: number): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (value && value.length < min) {
        callback(this.message || `最少请输入${min}个字符`)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 😄字符长度超过多少时报错
   * @param max 最大值
   */
  ifLengthGreaterThan(max: number): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (value && value.length > max) {
        callback(this.message || `最多允许输入${max}个字符`)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 😄不小于多少时报错 即必须大于
   * @param min 最小值
   */
  ifNotLessThan(min: number): this {
    this.toNumber()
    this.validator = (_: any, value: number, callback: Function) => {
      if (value <= min) {
        callback(this.message || `数字必须大于${min}`)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 😄不大于多少时报错 即必须小于
   * @param max 最大值
   */
  ifNotGreaterThan(max: number): this {
    this.toNumber()
    this.validator = (_: any, value: number, callback: Function) => {
      if (value >= max) {
        callback(this.message || `数字必须小于${max}`)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 😄小于多少时报错
   * @param min 最小值
   */
  ifLessThan(min: number): this {
    this.toNumber()
    this.validator = (_: any, value: number, callback: Function) => {
      if (value < min) {
        callback(this.message || `数字最小允许输入${min}`)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 😄大于多少时报错
   * @param max 最大值
   */
  ifGreaterThan(max: number): this {
    this.toNumber()
    this.validator = (_: any, value: number, callback: Function) => {
      if (value > max) {
        callback(this.message || `数字最大允许输入${max}`)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 😄为空时报错
   * @returns 
   */
  ifEmpty(): this {
    this.required = true
    return this
  }

  /** 
   * # 😄改变时验证
   */
  whenChange(): this {
    this.trigger = 'change'
    return this
  }

  /**
   * # 😄设置自定义验证器
   * @param validator 验证方法
   * @returns 
   */
  setCustomValidator(validator: (_: any, value: any, callback: Function) => void): this {
    this.validator = validator
    return this
  }

  /**
   * # 😄当不包含某些字符串时报错
   * @param whats 字符串数组
   * @returns 
   */
  ifNotContain(whats: string[]): this {
    let error = false
    this.validator = (_: any, value: string, callback: Function) => {
      error = false
      for (const what of whats) {
        if (!value || value.indexOf(what) < 0) {
          error = true
          break
        }
      }
      if (error) {
        callback(this.message || `输入中必须包含 ${whats.join(',')}`)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 😄当包含某些字符串时报错
   * @param whats 字符串数组
   * @returns 
   */
  ifContain(...whats: string[]): this {
    let error = ''
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value) {
        callback()
        return
      }
      for (const what of whats) {
        error = ''
        if (value.indexOf(what) >= 0) {
          error = what
          break
        }
      }
      if (error !== '') {
        callback(this.message || `不允许输入中包含 ${error} `)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 😄满足指定的正则表达式后报错
   * @param regx 正则
   * @returns 
   */
  ifTest(regx: RegExp): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (value && regx.test(value)) {
        callback(this.message || '正则表达式校验失败')
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 😄不满足指定的正则表达式后报错
   * @param regx 正则
   * @returns 
   */
  ifNotTest(regx: RegExp): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (value && !regx.test(value)) {
        callback(this.message || '正则表达式校验失败')
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 😄如果不是手机号时报错
   * @returns 
   */
  ifNotEmail(): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isEmail(value)) {
        callback()
      } else {
        callback(this.message || '请输入有效的电子邮箱')
      }
    }
    return this
  }

  /**
   * # 😄如果不是手机号时报错
   * @returns 
   */
  ifNotMobilePhone(): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isMobilePhone(value)) {
        callback()
      } else {
        callback(this.message || '请输入有效的手机号')
      }
    }
    return this
  }

  /**
   * # 😄如果不是座机号时报错
   * @returns 
   */
  ifNotTelPhone(): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isTelphone(value)) {
        callback()
      } else {
        callback(this.message || '请输入有效的座机号')
      }
    }
    return this
  }

  /**
   * # 😄如果不是联系电话时报错
   * @returns 
   */
  ifNotPhone(): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isTelphoneOrMobilePhone(value)) {
        callback()
      } else {
        callback(this.message || '请输入有效的联系电话')
      }
    }
    return this
  }

  /**
   * # 😄如果包含特殊字符时报错
   * @returns 
   */
  ifNotNormalCode(): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isNormalCode(value)) {
        callback()
      } else {
        callback(this.message || '请不要输入特殊字符')
      }
    }
    return this
  }

  /**
   * # 😄如果不是纯字母时报错
   * @returns 
   */
  ifNotOnlyLetter(): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isOnlyLetter(value)) {
        callback()
      } else {
        callback(this.message || '只允许输入字母')
      }
    }
    return this
  }

  /**
   * # 😄如果不是字母和数字报错
   * @returns 
   */
  ifNotOnlyNumberAndLetter(): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isOnlyNumberAndLetter(value)) {
        callback()
      } else {
        callback(this.message || '只允许输入字母和数字')
      }
    }
    return this
  }

  /** ********************************************* 数学相关 */

  /**
   * # 😄如果不是自然整数(含0)时报错
   * @returns 
   */
  ifNotNaturalInteger(): this {
    this.toNumber()
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isNaturalInteger(value)) {
        callback()
      } else {
        callback(this.message || '只允许输入非负整数')
      }
    }
    return this
  }

  /**
   * # 😄如果不是自然整数(含0)时报错
   * @returns 
   */
  ifNotNaturalNumber(): this {
    this.toNumber()
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isNaturalNumber(value)) {
        callback()
      } else {
        callback(this.message || '只允许输入非负数字')
      }
    }
    return this
  }

  /**
   * # 😄如果不是整数时报错
   * @returns 
   */
  ifNotInteger(): this {
    this.toNumber()
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isInteger(value)) {
        callback()
      } else {
        callback(this.message || '请输入有效的整数')
      }
    }
    return this
  }

  /**
   * # 😄如果不是数字(含小数)时报错
   * @returns 
   */
  ifNotNumber(): this {
    this.toNumber()
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isNumber(value)) {
        callback()
      } else {
        callback(this.message || '请输入有效的数字')
      }
    }
    return this
  }
}
