<template>
  <ADialog
    :title="title"
    :fullable="false"
    hide-cancel
    :hide-footer="!confirmText"
    :confirm-text="confirmText"
    class="upload-dialog"
    @onCancel="onCancel()"
    @on-confirm="onCustomConfirm()"
  >
    <template #body>
      <div v-loading="loading" class="file-upload-pack">
        <el-upload
          class="upload"
          drag
          :show-file-list="false"
          :action="url"
          :headers="uploadHeader"
          :before-upload="uploadReady"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :name="uploadName"
          :data="data"
        >
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">
            将文件拖拽到此处，或
            <em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              请上传
              <template v-if="!exts.includes('*')">
                <span style="color:orangered">{{ exts.join('/') }}</span>格式且
              </template>大小不超过<span style="color:orangered">
                {{ AirFileHelper.getFileSizeFriendly(props.maxSize) }}
              </span>的文件
            </div>
          </template>
        </el-upload>
      </div>
    </template>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref, PropType, computed } from 'vue'
import { ClassConstructor } from 'class-transformer'
import { ADialog } from '.'
import { AppConfig } from '../AppConfig'
import { AirNotification } from '../feedback/AirNotification'
import { AirClassTransformerHelper } from '../helper/AirClassTransformerHelper'
import { AirFileHelper } from '../helper/AirFileHelper'
import { IFile } from '../interface/IFile'
import { AirFileEntity } from '../dto/AirFileEntity'
import { AirHttpStatus } from '../enum/AirHttpStatus'

const props = defineProps({
  /**
   * # 标准确认返回
   */
  onConfirm: {
    type: Function,
    default: () => null,
  },

  /**
   * # 自定义确认按钮事件
   */
  onCustomConfirm: {
    type: Function,
    default: () => null,
  },

  /**
   * # 自定义上传成功回调
   */
  onCustomSuccess: {
    type: Function,
    default: null,
  },

  /**
   * # 标准取消返回
   */
  onCancel: {
    type: Function,
    default: () => null,
  },

  /** 
   * # 上传弹窗中的标题
   */
  title: {
    type: String,
    default: '文件上传',
  },

  /**
   * # 确认按钮的文字
   */
  confirmText: {
    type: String,
    default: undefined,
  },

  /** 
   * # 上传允许的最大文件大小 默认10m 
  */
  maxSize: {
    type: Number,
    default: 10 * 1024 * 1024,
  },

  /** 
   * # 上传文件使用的name属性
   */
  uploadName: {
    type: String,
    default: 'file',
  },

  /** 
   * # 上传成功的文案提示
   */
  uploadSuccess: {
    type: String,
    default: '你选择的文件上传成功！',
  },

  /** 
   * # 手动指定的上传路径
   */
  uploadUrl: {
    type: String,
    default: '',
  },

  /** 
   * # 允许上传的后缀
   */
  exts: {
    type: Array as PropType<string[]>,
    default: () => ['jpg', 'jpeg', 'png'],
  },

  /**
   * # 接收文件的实体类
   * 默认 ```AirFileEntity``` 
   */
  entity: {
    type: Object as PropType<ClassConstructor<IFile>>,
    default: () => AirFileEntity,
  },

  /**
   * # 上传文件同时发送的数据
   */
  data: {
    type: Object as PropType<Record<string, any>>,
    default: () => null,
  },
})

/**
 * # Loading状态
 */
const loading = ref(false)

/**
 * # 根路径
 */
const apiBaseUrl = ref(AppConfig.apiRootUrl)

/**
 * # 上传的URL
 */
const url = computed(() => props.uploadUrl || `${apiBaseUrl.value}file/uploadFile`)

/**
 * # 上传的header
 */
const uploadHeader = ref({
  Authorization: AppConfig.getAccessToken(),
} as Record<string, any>)

/**
 * # 上传验证
 */
function uploadReady(file: { name: string; size: number; }): boolean {
  // 文件类型验证
  if (!props.exts.includes('*')) {
    const arr = file.name.split('.')
    const fileExt = arr && arr.length > 1 ? arr[arr.length - 1] : ''
    const isFileTypeInLimited = !(props.exts.indexOf(fileExt.toLowerCase()) < 0)
    if (!isFileTypeInLimited) {
      new AirNotification().setTitle(`不允许的文件类型${fileExt}`)
      .setMessage(`只允许上传${props.exts.join('/')}类型的文件`)
      .error()
      return false
    }
  }
  const isFileSizeInLimited = file.size <= props.maxSize
  // 文件大小验证
  if (!isFileSizeInLimited) {
    new AirNotification().setTitle(`文件大小超限${AirFileHelper.getFileSizeFriendly(file.size)}`)
    .setMessage(`只允许上传不超过${AirFileHelper.getFileSizeFriendly(props.maxSize)}的文件`)
    .error()
    return false
  }

  loading.value = true
  return true
}
/**
 * # 上传成功
 */
function uploadSuccess(result: Record<string, any>) {
  loading.value = false
  if (result.code === undefined || result.code === null) {
    new AirNotification().setTitle('上传失败')
    .setMessage('好家伙,服务器连Code都没返回???')
    .error()
    return
  }
  if (result.code === AirHttpStatus.OK) {
    new AirNotification().setTitle('上传成功')
    .setMessage(props.uploadSuccess)
    .success()
    if (props.onCustomSuccess) {
      props.onCustomSuccess(result.data)
      props.onConfirm(null)
    } else {
      const entity = AirClassTransformerHelper.parse(result.data, props.entity)
      props.onConfirm(entity)
    }
  } else {
    new AirNotification().setTitle('上传失败')
    .setMessage(result.message || '好家伙,后端的拉垮哥们连Message都没返回???')
    .error()
  }
}

/**
 * # 上传失败
 */
function uploadError() {
  loading.value = false
  new AirNotification().setTitle('上传失败')
  .setMessage('文件上传失败,请稍候再试')
  .error()
}

</script>
<style lang="scss">
.upload-dialog {
  .main {
    min-width: 500px !important;
  }

  .file-upload-pack {
    display: flex;
    flex-direction: column;
    align-items: center;

    .upload {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      .el-upload {
        width: 100%;

        .el-upload-dragger {
          width: 100%;
        }
      }
    }
  }
}
</style>
