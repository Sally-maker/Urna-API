const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads')

const uploadAvatar = multer({
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
})

module.exports = uploadAvatar
