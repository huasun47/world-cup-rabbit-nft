const { join, extname } = require('path')
const { readdir, rename } = require('fs')

const dir = './first-400'

const floder = join(__dirname, dir)

readdir(floder, undefined, (err, data) => {
  if (err) {
    return
  }
  const files = data.filter((url) => extname(url) === ".png")
  files.sort((a, b) => parseInt(b) - parseInt(a))

  play(files)
})

const play = (files) => {
  const fileName = files.shift()
  const numName = fileName.split('.')[0]
  const oldFilePath = join(floder, `${numName}.png`)
  const newFilePath = join(floder, `${parseInt(numName) + 1}.png`)

  rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      console.log(err, 'rename')
      return
    }
    if (files.length) {
      play(files)
    }
  })
}
