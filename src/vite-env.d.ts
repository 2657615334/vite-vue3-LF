/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 声明 .vue 文件
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const conponent: DefineComponent<object, object, any>
  export default conponent
}