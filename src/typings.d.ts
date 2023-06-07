// 声明window上的自定义属性
declare interface Window {
  eventBus: any
}

// 声明 .vue 文件
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const conponent: DefineComponent<object, object, any>
  export default conponent
}
