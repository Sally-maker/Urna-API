const { verifyFileExtension } = require('./verifyFileExtension')

/**
 * @param {string} originalFileName
 * @param {Buffer} fileBuffer
 */
function transformImageFileInBase64URI(originalFileName, fileBuffer) {
  const { testResult, fileExtension } = verifyFileExtension(originalFileName)

  const extensionsFilesAccepts = {
    jpeg: 'jpeg',
    png: 'png',
  }

  const fileReturned = extensionsFilesAccepts[fileExtension]

  if (testResult) {
    const parseToBase64 = fileBuffer.toString('base64')
    const formatedData = `data:image/${fileReturned};base64,${parseToBase64}`

    return formatedData
  }
}

module.exports = {
  transformImageFileInBase64URI,
}
