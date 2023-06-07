<!-- eslint-disable vue/require-v-for-key -->
<template>
  <APanel title="AirHttp的使用DEMO 请查看Console和Network">
    <template #body>
      <div class="http">
        <el-switch v-model="ignoreError" @change="http.ignoreError(ignoreError)" />
        {{ ignoreError ? '忽略错误,AirHttp将自动处理错误' : '不忽略错误,自己try-catch接管错误' }}
      </div>
      <div class="http">
        <el-input
          v-model="url"
          clearable
          placeholder="输入访问的地址"
          @change="setUrl()"
        />
      </div>
      <div class="http">
        <el-select v-model="method" @change="setMethod()">
          <el-option v-for="m in AirHttpMethod" :key="m" :value="m">
            {{ m }}
          </el-option>
        </el-select>&nbsp;&nbsp;
        <el-select v-model="contentType" @change="setContentType()">
          <el-option v-for="m in AirHttpContentType" :key="m" :value="m">{{ m }}</el-option>
        </el-select>
      </div>
      <div class="http">
        <AButton type="ADD" button @click="addHeader(); setHeader()">添加Header</AButton>
      </div>
      <template v-for="(header, index) in headerList">
        <div class="http">
          <el-input v-model="header.key" placeholder="header key" @change="setHeader()" />
          &nbsp;&nbsp;
          <el-input
            v-model="header.value"
            clearable
            placeholder="header value"
            @change="setHeader()"
          />
          &nbsp;&nbsp;
          <AButton
            type="DELETE"
            button
            danger
            @click="headerList.splice(index, 1); setHeader()"
          >
            删除
          </AButton>
        </div>
      </template>
      <div class="http">
        <el-input
          v-model="data"
          type="textarea"
          placeholder="发送的数据"
          autosize
        />
      </div>
      <div class="http">
        <AButton
          button
          type="PUBLISH"
          primary
          @click="send()"
        >
          测试发送请求
        </AButton>
      </div>
      {{ loading }}
      <div class="http">
        <span>保存的配置如下</span>
      </div>
      {{ http }}
    </template>
  </APanel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { APanel, AButton } from '@/airpower/component'
import { AirHttp } from '@/airpower/model/AirHttp'
import { AirHttpMethod } from '@/airpower/enum/AirHttpMethod'
import { AirHttpContentType } from '@/airpower/enum/AirHttpContentType'

const http = ref(new AirHttp())

const method = ref(AirHttpMethod.POST)

const contentType = ref(AirHttpContentType.JSON)

const ignoreError = ref(false)

const url = ref('https://api.hamm.cn/test')

const headerList = ref([{
  key: 'content-type',
  value: 'test-but-not-success',
}, {
  key: 'authorization',
  value: 'access-token',
}] as Record<string, string>[])

function addHeader() {
  headerList.value.push({
    key: '',
    value: '',
  })
}
function setHeader() {
  const headers: Record<string, string> = {}
  for (const header of headerList.value) {
    headers[header.key] = header.value
  }
  http.value.setHttpHeader(headers)
  console.log('已设置为', headers)
}

function setUrl() {
  http.value.setHttpUrl(url.value)
  console.log('已设置为', url.value)
}

function setMethod() {
  http.value.setHttpMethod(method.value)
  console.log('已设置为', method.value)
}

function setContentType() {
  http.value.setContentType(contentType.value)
  console.log('已设置为', contentType.value)
}
const data = ref('')
const result = ref('')
const loading = ref(false)
async function send() {
  try {
    result.value = await http.value.send(data.value)
    console.log(result.value)
  } catch (err) {
    console.log(err)
  }
}

setUrl()
setMethod()
setContentType()
setHeader()

</script>
<style scoped lang="scss">
.http {
  display: flex;
  flex-direction: row;
  padding: 10px 40px;
}
</style>
