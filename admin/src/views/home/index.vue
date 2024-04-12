<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { formatEther } from '@ethersproject/units'
import { useIndexStore } from '@/store';
import { useContract } from '@/utils/contract';
import { Message } from 'element3';

const router = useRouter()
const { privateKey, setOwner, setPrivateKey } = useIndexStore()
const contract = useContract(privateKey)

const balance = ref('0 ETH')
const baseUri = ref('')
const locked = ref(true)
const accounts = ref('')
const lines = ref(`0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266: 10
0x511FB70671361F1831a441B46eac212Ea219dB72: 0
`)

const logout = () => {
  setOwner(false)
  setPrivateKey('')
  router.replace('/login')
}

// 查看数量
const checkBalance = async () => {
  const bignum = await contract.showBalance()
  balance.value = `${formatEther(bignum)} ETH`
}

// 查看 NFT Base URI
const checkBaseUri = async () => {
  baseUri.value = await contract.baseURI()
}

// 开关
const pause = async (open: boolean) => {
  const tx = await contract.pause(open)
  console.log(tx)
  const done = await tx.wait();
  console.log(done)
}
// 取款
const withdraw = async () => {
  const tx = await contract.withdraw()
  console.log(tx)
  const done = await tx.wait();
  console.log(done)
  checkBalance()
}

const setBaseUri = async () => {
  if (baseUri.value.startsWith('ipfs://') && baseUri.value.endsWith('/')) {
    const tx = await contract.setBaseURI(baseUri.value)
    console.log(tx)
    const done = await tx.wait();
    console.log(done)
    locked.value = true
    return
  }
  Message.error('必须以 ipfs://  开头， 以   /   结尾');
}
const clearBaseUri = () => {
  baseUri.value = ''
  locked.value = false
}

const checkMinted = async () => {
  const list = accounts.value.split('\n')
  for (const account of list) {
    const bignum = await contract.numberMinted(account)
    lines.value += `${account}: ${bignum.toNumber()}\n`
    console.log(lines.value)
  }
}

checkBalance()
checkBaseUri()
</script>

<template>
  <el-container class="admin-container">
    <el-card class="card">
      <template #header>
        <div class="card-title">
          <span>控制面板</span>
          <el-button type="danger" @click="logout">退出登陆</el-button>
        </div>
      </template>
      <el-form label-position="top" label-width="auto">
        <el-form-item label="合约地址">
          <el-input placeholder="请输入管理员钱包私钥" v-model="contract.address" :disabled="!!contract.address" />
        </el-form-item>
        <el-divider />
        <el-form-item>
          <el-input placeholder="请输入管理员钱包私钥" v-model="balance" disabled />
          <el-button type="primary" @click="checkBalance">查看合约内ETH数量</el-button>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button @click="pause(false)">开启合约交易</el-button>
            <el-button type="info" @click="pause(true)">暂停合约交易</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="withdraw">取款</el-button>
        </el-form-item>
        <el-divider />
        <el-form-item label="Base URI" required>
          <el-input placeholder="请输入Base URI" v-model="baseUri" :disabled="locked" />
          <el-button type="primary" @click="clearBaseUri" v-if="locked">重新设定 Base URI</el-button>
          <el-button type="primary" @click="setBaseUri" v-else>确定</el-button>
        </el-form-item>
        <el-form-item label="查看地址购买数量(换行分割)">
          <el-input type="textarea" placeholder="请输入钱包地址, 换行分割" v-model="accounts" />
          <el-button type="primary" @click="checkMinted">确定</el-button>
          <pre>
            <code>
              {{ lines }}
            </code>
          </pre>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<style scoped>
.admin-container {
  display: grid;
  place-items: center;
  height: 100vh;
}

.card {
  width: 80%;
}

.card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
