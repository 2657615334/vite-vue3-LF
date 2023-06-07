import { FormItemRule } from 'element-plus'
import { Arrayable } from 'element-plus/es/utils'
import { IValidateRule } from '../interface/IValidateRule'

/**
 * # 😄基础验证类
 * @author Hamm
 */
export class AirValidatorHelper {
  /**
   * # 😄验证是否手机号或座机号
   * @param phoneNumber 号码
   * @returns 验证结果
   */
  static isTelphoneOrMobilePhone(phoneNumber: string): boolean {
    return this.isMobilePhone(phoneNumber) || this.isTelphone(phoneNumber)
  }

  /**
   * # 😄验证是否邮箱
   * @param num 邮箱
   * @returns 验证结果
   */
  static isEmail(email: string): boolean {
    return /^[a-zA-Z0-9]+(\.([a-zA-Z0-9]+)){0,}@[a-zA-Z0-9]+(\.([a-zA-Z0-9]+)){1,}$/.test(email)
  }

  /**
   * # 😄验证是否手机号里
   * @param num 号码
   * @returns 验证结果
   */
  static isMobilePhone(num: string): boolean {
    return /^(\+(\d{1,4})){0,1}1[3-9](\d{9})$/.test(num)
  }

  /**
   * # 😄验证是否座机号
   * @param num 号码
   * @returns 验证结果
   */
  static isTelphone(num: string): boolean {
    return /^(((0\d{2,3})-){0,1}((\d{7,8})|(400\d{7})|(800\d{7}))(-(\d{1,4})){0,1})$/.test(num)
  }

  /**
   * # 😄是否普通字符串(不包含特殊字符)
   * 
   * 允许字符:
   * > @ # % a-z A-Z 0-9 汉字 _ + /
   * @param str 字符串
   * @returns 验证结果
   */
  static isNormalCode(str: string): boolean {
    return /^[@#%a-zA-Z0-9\u4e00-\u9fa5_\-\\/\\+]+$/.test(str)
  }

  /**
   * # 😄字符串是否只包含了字母
   * @param str 字符串
   * @returns 验证结果
   */
  static isOnlyLetter(str: string): boolean {
    return /^[a-zA-Z]+$/.test(str)
  }

  /**
   * # 😄字符串是否只包含了数字
   * @param str 字符串
   * @returns 验证结果
   */
  static isOnlyNumberAndLetter(str: string): boolean {
    return /^[0-9a-zA-Z]+$/.test(str)
  }

  /**
   * # 😄字符串是否是数字 正负整数小数和0
   * @param str 字符串
   * @returns 验证结果
   */
  static isNumber(str: string): boolean {
    return /^(-){0,1}[0-9]+((.)[0-9]+){0,1}$/.test(str)
  }

  /**
   * # 😄字符串是否是整数
   * @param str 字符串
   * @returns 验证结果
   */
  static isInteger(str: string): boolean {
    return /^(-){0,1}[0-9]+$/.test(str)
  }

  /**
   * # 😄字符串是否是自然整数小数
   * @param str 字符串
   * @returns 验证结果
   */
  static isNaturalNumber(str: string): boolean {
    return /^[0-9]+((.)[0-9]+){0,1}$/.test(str)
  }

  /**
   * # 😄字符串是否是自然整数数
   * @param str 字符串
   * @returns 验证结果
   */
  static isNaturalInteger(str: string): boolean {
    return /^[0-9]+$/.test(str)
  }

  /**
   * # 😄创建一个验证器
   * @param rule 验证规则
   * @returns 
   */
  static create(rule: IValidateRule): Partial<Record<string, Arrayable<FormItemRule>>> {
    return rule as Partial<Record<string, Arrayable<FormItemRule>>>
  }
}
