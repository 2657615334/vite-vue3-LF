<template>
  <ADialog
    title="新增用户"
    confirm-text="保存"
    width="400"
    height="200"
    :form-ref="formRef"
    @onConfirm="submitData()"
    @onCancel="onCancel()"
  >
    <template #body>
      <el-form
        ref="formRef"
        :model="data"
        label-width="120px"
        :rules="rules"
        @submit.prevent
      >
        <el-form-item :label="UserEntity.prototype.getCustomFieldName('name')" prop="name">
          <AInput v-model.name="data.name" :entity="UserEntity" />
        </el-form-item>
        <el-form-item :label="UserEntity.prototype.getCustomFieldName('age')" prop="age">
          <AInput v-model.age="data.age" :entity="UserEntity" />
        </el-form-item>
        <el-form-item :label="UserEntity.prototype.getCustomFieldName('userRemark')" prop="userRemark">
          <el-input
            v-model="data.userRemark"
            maxlength="50"
            :placeholder="UserEntity.prototype.getCustomFieldName('userRemark')"
          />
        </el-form-item>
      </el-form>
    </template>
  </ADialog>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { ADialog, AInput } from '@/airpower/component'
import { AirFormInstance } from '@/airpower/type/AirType'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { AirValidatorHelper } from '@/airpower/helper/AirValidatorHelper'
import { AirValidator } from '@/airpower/model/AirValidator'
import { UserEntity } from '@/entity/UserEntity'

const props = defineProps({
  onConfirm: {
    type: Function,
    default: () => null,
  },
  onCancel: {
    type: Function,
    default: () => null,
  },
})

const data = ref(new UserEntity())

const rules = AirValidatorHelper.create({
  name: [
    new AirValidator().show('你一定要输入用户的名字')
    .ifEmpty(),
  ],
  age: [
    new AirValidator().toNumber()
    .ifEmpty()
    .show('你必须输入的数字'),
    /* new AirValidator().toNumber()
       .ifNotLessThan(0)
       .show(),
       new AirValidator().toNumber()
       .ifNotGreaterThan(0)
       .show(), */
    new AirValidator().toNumber()
    .ifLessThan(0)
    .show(),
    new AirValidator().toNumber()
    .ifGreaterThan(50)
    .show(),
  ],
})

const formRef = ref<AirFormInstance>()
// 表单提交
async function submitData() {
  // await new UserService().saveData(data.value, '添加用户成功')
  new AirNotification().setTitle('添加用户成功')
  .setMessage('这里只是模拟了下数据的处理，网络并没有请求，查看console的数据')
  .success()
  console.log('UserEntity', data.value)
  console.log('Object', data.value.toSourceObject())
  console.log('JSON', data.value.toSourceString())
  props.onConfirm()
}
</script>

<style scoped lang="scss">
</style>
