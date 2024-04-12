import { ref } from 'vue'
import { defineStore } from 'pinia'


// import { useUserStore } from './modules/user'

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。



export const useIndexStore = defineStore('index', () => {
  // 访问其他 store
  // const userStore = useUserStore()
  // console.log(userStore.user)


  const privateKey = ref('')
  const isOwner = ref(false)


  const setPrivateKey = (key: string) => {
    privateKey.value = key
  }
  const setOwner = (flag: boolean) => {
    isOwner.value = flag
  }

  // getters --- 

  return { privateKey, isOwner, setOwner, setPrivateKey }
}, {
  persist: {
    enabled: true
  }
})

