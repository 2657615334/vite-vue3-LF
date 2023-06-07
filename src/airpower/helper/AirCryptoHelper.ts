import CryptoJS from 'crypto-js'
import { Base64 } from 'js-base64'

/**
 * # 😄加解密和散列摘要算法助手类
 * @author Hamm
 */
export class AirCryptoHelper {
  /** 
   * # 😄默认key
   */
  private static key = '123456789@houhou'

  /**
   * # 😄AES加密方法
   * @param data 加密数据
   * @param key [可选]密钥 默认```123456789@houhou```
   * @param mode [可选]加密方式 默认 CBC
   * @param padding [可选]填充方式 默认无填充
   * @returns 
   */
  static aesEncrypt(data: string, key = this.key, mode = CryptoJS.mode.CBC, padding = CryptoJS.pad.ZeroPadding): string {
    const src = CryptoJS.enc.Utf8.parse(data)
    const iv = CryptoJS.enc.Utf8.parse(key)
    return CryptoJS.AES.encrypt(src, iv, {
      iv,
      mode,
      padding,
    }).toString()
  }

  /**
   * # 😄AES解密方法
   * @param data 需要解密的数据
   * @param key [可选]密钥 默认```123456789@houhou```
   * @param mode [可选]加密方式 默认 CBC
   * @param padding [可选]填充方式 默认无填充
   * @returns 
   */
  static aesDecrypt(data: string, key = this.key, mode = CryptoJS.mode.CBC, padding = CryptoJS.pad.ZeroPadding): string {
    const iv = CryptoJS.enc.Utf8.parse(key)
    return CryptoJS.AES.decrypt(data, iv, {
      iv,
      mode,
      padding,
    }).toString(CryptoJS.enc.Utf8)
  }

  /**
   * # 😄SHA1散列摘要
   * @param data 源字符串
   * @returns 
   */
  static sha1(data: string): string {
    return CryptoJS.SHA1(data).toString()
  }

  /**
   * # 😄MD5散列摘要
   * @param data 源字符串
   * @returns 
   */
  static md5(data: string): string {
    return CryptoJS.MD5(data).toString()
  }

  /**
   * # 😄Base64编码
   * @param data 
   * @returns 
   */
  static base64Encode(data: string): string {
    return Base64.encode(data)
  }

  /**
   * # 😄Base64解码
   * @param data 
   * @returns 
   */
  static base64Decode(data: string): string {
    return Base64.decode(data)
  }
}
