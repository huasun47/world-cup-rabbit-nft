<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { Message } from 'element3'
import { useIndexStore } from '@/store'
import { useContract } from '@/utils/contract'


const router = useRouter()
const store = useIndexStore()

const { privateKey, setOwner, setPrivateKey } = store


const form = reactive({
  privateKey
})
const rules = {
  privateKey: [
    { required: true }
  ]
}

const formRef = ref()
const loading = ref(false)

const submit = () => {
  formRef.value.validate(async (passed: boolean) => {
    if (!passed) {
      return
    }
    loading.value = true
    try {
      const contract = useContract(form.privateKey)
      // check owner ---
      try {
        const isOwner = await contract.isOwnerCall()
        if (isOwner) {
          setOwner(true)
          setPrivateKey(form.privateKey)
          Message.success('登陆成功')
          router.replace('/')
        }
      } catch (err) {
        console.log(err)
        Message.error('你不是合约的拥有者')
        loading.value = false
      }
      // ----
    } catch (err) {
      console.log(err)
      Message.error('私钥格式不正确')
      loading.value = false
    }
  })
}
</script>

<template>
  <el-container class="login-container">
    <el-card class="form">
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" label-width="auto">
        <el-form-item label="管理员私钥" prop="privateKey">
          <el-input type="textarea" autosize placeholder="请输入管理员钱包私钥" v-model="form.privateKey" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" :loading="loading">确认</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>


</template>

<style scoped>
.login-container {
  display: grid;
  place-items: center;
  height: 100vh;
}

.form {
  width: 400px;
}
</style>
