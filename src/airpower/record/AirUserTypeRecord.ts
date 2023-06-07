import { AirUserType } from '../enum/AirUserType'
import { IRecord } from '../interface/IRecord'

/**
 * # 😄用户类型枚举翻译字典
 * @author Hamm
 */
export const AirUserTypeRecord: IRecord[] = [
  {
    key: AirUserType.ROOT_USER,
    label: '超级管理员',
  }, {
    key: AirUserType.IMPLEMENTER_USER,
    label: '实施人员',
  }, {
    key: AirUserType.TENANT_ADMIN_USER,
    label: '企业管理员',
  }, {
    key: AirUserType.TENANT_NORMAL_USER,
    label: '企业员工',
  }, {
    key: AirUserType.OPERATION_USER,
    label: '运营管理员',
  },
]
