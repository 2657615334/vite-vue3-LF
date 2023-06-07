/* eslint-disable no-unused-vars */
/**
 * # 😄用户类型枚举
 * @author Hamm
 */

export enum AirUserType {
  /**
   * # 😄超级管理员
   */
  ROOT_USER = '00',

  /**
   * # 😄实施人员
   */
  IMPLEMENTER_USER = '01',

  /**
   * # 😄租户(企业)管理员
   */
  TENANT_ADMIN_USER = '02',

  /**
   * # 😄企业员工
   */
  TENANT_NORMAL_USER = '03',

  /**
   * # 😄运营管理员
   */
  OPERATION_USER = '04'
}
