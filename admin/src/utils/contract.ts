
import { Wallet, Contract } from 'alchemy-sdk';
import { Web3Provider } from '@ethersproject/providers'
import json from '@/assets/WorldCupRabbitNFT.json'

let oldKey: string
let contract: Contract

const create = (key: string = '') => {
  const provider = new Web3Provider(window.ethereum)
  const wallet = key ? new Wallet(key, provider) : provider
  return new Contract(import.meta.env.VITE_CONTRACT_ADDRESS, json.abi, wallet)
}


const useContract = (key: string = '') => {
  if (oldKey !== key) {
    contract = create(key)
    console.log(contract)
    oldKey = key
  }

  return contract
}

export {
  useContract
}