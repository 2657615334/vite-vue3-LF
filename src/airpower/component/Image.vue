<template>
  <div class="air-image" :style="{ width: props.imageConfig.width + 'px', height: props.imageConfig.height + 'px' }">
    <el-image
      fit="contain"
      :src="imageUrl"
      preview-teleported
      :preview-src-list="[imageUrl]"
      lazy
      :z-index="999999"
    >
      <template #error>
        <div class="image-error">
          {{ upload?'上传图片': '暂无图片' }}
        </div>
      </template>
    </el-image>
    <div v-if="uploadHeader && upload" class="image-upload" :class="imageUrl ? 'image-preview-color' : ''">
      <el-upload
        v-if="!imageUrl"
        class="image-upload-box"
        :action="uploadUrl"
        :headers="uploadHeader"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-error="uploadError"
        :on-success="uploadSuccess"
      />
    </div>
    <div v-if="imageUrl && upload" class="action">
      <el-icon @click="imageRemoved">
        <CircleCloseFilled />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType, computed, Ref } from 'vue'
import { ClassConstructor } from 'class-transformer'
import { AirImageConfig } from '../config/AirImageConfig'
import { AirFileService } from '../service/AirFileService'
import { AirFileEntity } from '../dto/AirFileEntity'
import { AirNotification } from '../feedback/AirNotification'
import { AirClassTransformerHelper } from '../helper/AirClassTransformerHelper'
import { AirFileHelper } from '../helper/AirFileHelper'

const props = defineProps({
  /**
   * # 显示文件 优先级更高
   */
  file: {
    type: Object as PropType<AirFileEntity>,
    default: () => undefined,
  },

  /**
   * # 显示的URL
   */
  src: {
    type: String,
    default: () => undefined,
  },

  /**
   * # 允许上传
   */
  upload: {
    type: Boolean,
    default: false,
  },

  /**
   * # 显示上传tips
   */
  showTips: {
    type: Boolean,
    default: false,
  },

  /**
   * # 图片配置
   */
  imageConfig: {
    type: AirImageConfig,
    default: () => new AirImageConfig(),
  },

  /**
   * # 限制上传的大小
   */
  limit: {
    type: Number,
    default: () => 3 * 1024 * 1024,
  },

  /**
   * # 允许上传的格式
   */
  exts: {
    type: Array,
    default: () => ['jpg', 'jpeg', 'png'],
  },

  /**
   * # 上传地址
   */
  uploadUrl: {
    type: String,
    default: '',
  },

  /**
   * # 接收的文件实体类
   */
  entity: {
    type: Function as unknown as PropType<ClassConstructor<AirFileEntity>>,
    default: () => AirFileEntity,
  },
})

/**
 * # 上传的文件对象
 */
const fileEntity: Ref<AirFileEntity | undefined> = ref()

if (props.file) {
  fileEntity.value = AirClassTransformerHelper.copy(props.file, props.entity)
}

/**
 * # 真实上传地址
 */
const uploadUrl = computed(() => props.uploadUrl || new AirFileService().getUploadUrl())

/**
 * # 显示的文件地址
 */
const imageUrl = ref('')

function init() {
  if (fileEntity.value) {
    imageUrl.value = AirFileHelper.getStaticFileUrl(fileEntity.value.url)
    return
  }
  if (props.src) {
    imageUrl.value = AirFileHelper.getStaticFileUrl(props.src)
    return
  }
  imageUrl.value = ''
}

init()

/**
 * # 上传文件的头
 */
const uploadHeader = ref({
  Authorization: localStorage.getItem('access_token'),
})

// eslint-disable-next-line no-unused-vars
const emits = defineEmits<{(event: 'change', file: AirFileEntity): void;
  // eslint-disable-next-line no-unused-vars
  (event: 'onChange', file: AirFileEntity): void;
  // eslint-disable-next-line no-unused-vars
  (event: 'remove'): void;
  // eslint-disable-next-line no-unused-vars
  (event: 'onRemove'): void;
}>()

/**
 * # 移除图像事件
 */
function imageRemoved() {
  fileEntity.value = undefined
  imageUrl.value = ''
  emits('onRemove')
  emits('remove')
}

/**
 * # 文件格式校验
 * @param file 文件
 * @return 是否成功
 */
function beforeUpload(file: File): boolean {
  const airNotify = new AirNotification()
  const fileExt = file.name.substring(file.name.lastIndexOf('.') + 1)
  if (!props.exts.includes(fileExt.toLocaleLowerCase())) {
    airNotify.setTitle('图片格式不支持').setMessage(`仅允许${props.exts.join('/')}格式`)
    .warning()
    return false
  }
  if (file.size > props.limit) {
    airNotify.setTitle('图片过大').setMessage(`图片大小不能超过${AirFileHelper.getFileSizeFriendly(props.limit)}!`)
    .warning()
    return false
  }
  return true
}

/**
 * # 上传失败事件
 */
function uploadError() {
  const airNotify = new AirNotification()
  airNotify.setTitle('上传失败').setMessage('图片上传失败,请重新上传')
  .error()
}

/**
 * # 上传成功事件
 * @param response 成功响应
 * @param file 文件
 */
function uploadSuccess(response: { data: { url: string } }) {
  fileEntity.value = AirClassTransformerHelper.parse(response.data, props.entity)
  init()
  emits('onChange', fileEntity.value)
  emits('change', fileEntity.value)
}
</script>
<style lang="scss">
.air-image {
  display: inline-block;
  position: relative;
  background: #f5f7fa;
  border-radius: 5px;
  overflow: hidden;
  user-select: none;

  .el-image {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    .image-error {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      justify-content: center;
      align-items: center;
      display: flex;
      color: #aaa;
      font-size: 14px;
    }
  }

  .image-upload {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all .3s;

    .image-upload-box {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

      .el-upload {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
    }
  }

  .action {
    position: absolute;
    right: -100px;
    bottom: 5px;
    background-color: white;
    color: orangered;
    border-radius: 100%;
    font-size: 24px;
    display: inline-block;
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    pointer-events: auto;
    font-weight: bold;
  }

}

.air-image:hover {
  cursor: pointer;

  .action {
    display: flex;
    z-index: 99;
    right: 5px;
  }

  .image-upload {
    background-color: rgba($color: #000000, $alpha: 0.3);
  }

  .image-preview-color {
    pointer-events: none;
  }
}
</style>
