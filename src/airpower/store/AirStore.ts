import { defineStore } from 'pinia'

/**
 * # 😄全局状态管理器
 * @author Hamm
 */
export const AirStore = defineStore('AirStore', {
  state: () => ({
    /**
     * # 菜单收起展开状态
     */
    menuCollapsed: false,
  }),
})
