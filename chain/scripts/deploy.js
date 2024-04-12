// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const { join } = require('path')
const { copyFile } = require('fs')

const rawFolder = join(__dirname, '../artifacts/contracts/WorldCupRabbitNFT.sol/WorldCupRabbitNFT.json')
const targetFolder = join(__dirname, '../../site/src/assets/WorldCupRabbitNFT.json')
const adminFolder = join(__dirname, '../../admin/src/assets/WorldCupRabbitNFT.json')

async function main() {

  const Lock = await hre.ethers.getContractFactory("WorldCupRabbitNFT")
  const lock = await Lock.deploy(
    // base url
    'ipfs://bafybeib3ih2nowfiwhaiku2qpdnzfvoswjlgkqso6yl5qr4mmbckhwnlp4/',
  )

  await lock.deployed()

  console.log(`deployed to ${lock.address}`)

  copyFile(rawFolder, targetFolder, (err) => {
    if (err) {
      throw err
    }
    console.log('copy site successfull!')
    copyFile(rawFolder, adminFolder, (err) => {
      if (err) {
        throw err
      }
      console.log('copy admin successfull!')
    })
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

