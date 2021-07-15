const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, 'floresta.jpg')

function verifyImageFileExtension(file) {
  const jpegImage = /\.jpg|\.jpeg$/.test(file)

  if (jpegImage) {
    return 'jpeg'
  }

  return 'png'
}

function parseImageFileToBase64URL(file) {
  const extensionsAccepts = {
    jpeg: 'jpeg',
    png: 'png',
  }

  const fileVerification = verifyImageFileExtension(file)

  const fileExtension = extensionsAccepts[fileVerification]

  const fileRead = fs.readFileSync(file)

  const fileParsed = fileRead.toString('base64')

  return `data:image/${fileExtension};base64,${fileParsed}`
}

console.log(parseImageFileToBase64URL(filePath))
