/**
 * Esta função tem a responsabilidade de verificar
 * se o final da extensão do arquivo termina com jpeg, jpg ou png,
 * se sim retorna true caso contrário retorna false
 * também retorna a extensão do arquivo se jpeg ou png
 * @param {string} file
 *
 */
function verifyFileExtension(file) {
  const testFileExtension = /\.jpeg$|\.jpg$|\.png$/i

  const getFileExtension = /\.jpeg$|\.jpg$|/i
  const isJpgImage = getFileExtension.test(file)

  if (isJpgImage) {
    return {
      testResult: testFileExtension.test(file),
      fileExtension: 'jpeg',
    }
  }

  return {
    testResult: testFileExtension.test(file),
    fileExtension: 'png',
  }
}

module.exports = {
  verifyFileExtension,
}
