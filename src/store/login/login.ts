import { defineStore } from 'pinia'
export const useLoginStore = defineStore('login', {
  state() {
    return {
      userInfo: {
        name: '张三',
        password: '4567',
      },
    }
  },
  getters: {
    newName: (state) => state.userInfo.name + 'vip',
  },
  actions: {
    update_userInfo(userInfo: { name: string; password: string }): void {
      this.userInfo = userInfo
    },
    update_password(password: string): void {
      this.userInfo.password = password
    },
  },
  // 默认存储到localStorage
  persist: {
    key: 'login', // 修改存储的键名，默认为当前 Store 的 id
    storage: window.sessionStorage, // 存储位置修改为 sessionStorage
    // paths: ['userInfo.name'], //默认会将store中的所有字段都缓存，可以通过paths点符号路径数组指定要缓存的字段
  },
})
