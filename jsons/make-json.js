const { join } = require('path')
const { writeFile } = require('fs')

const dir = './first-400-json'

const folder = join(__dirname, dir)

let count = 400

const baseURI = 'ipfs://bafybeibcjaperxogvs4jhi7huxjdkwtjw4hmq7uc5mhk75kokrhbtk3shy/'

const wirte = () => {

  const jsonTxt = `
{
  "name": "Rabbit #${count}",
  "image": "${baseURI}${count}.png",
  "attributes": [
      {
        "trait_type": "Background",
        "value": "Orange"
      },
      {
        "trait_type": "Scarf",
        "value": "Red"
      },
      {
        "trait_type": "Jersey",
        "value": "Argentina"
      },
      {
        "trait_type": "Face",
        "value": "White and little pink"
      },
      {
        "trait_type": "Eyes",
        "value": "Brown eyes"
      },
      {
        "trait_type": "Mouth",
        "value": "Crevice"
      }
    ]
  }
`
  const fileName = join(folder, `${count}.json`)

  writeFile(fileName, jsonTxt, (err) => {
    if (err) throw err
    count--
    if (count > 0) {
      wirte()
    }
  })
}

wirte()
