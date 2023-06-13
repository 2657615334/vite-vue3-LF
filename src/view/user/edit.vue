<template>
  <ADialog
    title="修改用户"
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
        <el-form-item
          :label="UserEntity.prototype.getCustomFieldName('name')"
          prop="name"
        >
          <AInput v-model.name="data.name" :entity="UserEntity" />
        </el-form-item>
        <el-form-item
          :label="UserEntity.prototype.getCustomFieldName('userSex')"
          prop="userSex"
        >
          <AInput v-model.userSex="data.userSex" :entity="UserEntity" />
        </el-form-item>
        <el-form-item
          :label="UserEntity.prototype.getCustomFieldName('remark')"
          prop="remark"
        >
          <AInput v-model.remark="data.remark" :entity="UserEntity" />
        </el-form-item>
      </el-form>
    </template>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ADialog, AInput } from "@/airpower/component";
import { AirFormInstance } from "@/airpower/type/AirType";
import { AirNotification } from "@/airpower/feedback/AirNotification";
import { AirClassTransformerHelper, AirValidatorHelper } from "@/airpower/helper";
import { AirValidator } from "@/airpower/model/AirValidator";
import { UserEntity } from "@/entity/UserEntity";
import { UserService } from "@/service/UserService";

const props = defineProps({
  onConfirm: {
    type: Function,
    default: () => null,
  },
  onCancel: {
    type: Function,
    default: () => null,
  },
  param: {
    type: UserEntity,
    default: () => null,
  },
});

const data = ref(new UserEntity());
async function getDetail() {
  /* data.value = await new UserService().getDetailById(props.param.id, UserEntity)
     下面是模拟请求数据 请用上面的接口正常返回数据后删除下面的 */

  data.value = AirClassTransformerHelper.parse(props.param.toSourceObject(), UserEntity);
}
getDetail();

const rules = AirValidatorHelper.create({
  name: [new AirValidator().show("你一定要输入用户的名字").ifEmpty()],
});

const formRef = ref<AirFormInstance>();
// 表单提交
async function submitData() {
  await new UserService().updateData(data.value, "修改用户成功");
  new AirNotification()
    .setTitle("修改用户成功")
    .setMessage("这里只是模拟了下数据的处理，网络并没有请求，查看console的数据")
    .success();
  console.log("UserEntity", data.value);
  console.log("Object", data.value.toSourceObject());
  console.log("JSON", data.value.toSourceString());
  props.onConfirm();
}
</script>

<style scoped lang="scss"></style>
