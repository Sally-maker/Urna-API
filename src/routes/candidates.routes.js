const { Router } = require('express')

const CandidatesController = require('../controllers/CandidatesController')
const upload = require('../config/upload')

const candidatesRoutes = Router()
const candidatesController = new CandidatesController()

candidatesRoutes.put('/:_id/voto', candidatesController.vote)
candidatesRoutes.post(
  '/cadastrar',
  upload.single('avatar'),
  candidatesController.create
)
candidatesRoutes.get('/', candidatesController.index)
candidatesRoutes.delete('/delete/:_id', candidatesController.delete)
candidatesRoutes.patch(
  '/:_id/avatar',
  upload.single('avatar'),
  candidatesController.avatar
)
candidatesRoutes.get('/:codigo/show', candidatesController.show)
candidatesRoutes.put('/edit/:_id', candidatesController.update)

module.exports = candidatesRoutes
