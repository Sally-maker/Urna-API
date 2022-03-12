const { Router } = require('express')

const {
  CandidatesController,
} = require('../controllers/CandidateController/CandidatesController')
const multer = require('multer')

const candidatesRoutes = Router()
const candidatesController = new CandidatesController()

candidatesRoutes.put('/:_id/voto', candidatesController.vote)
candidatesRoutes.post(
  '/cadastrar',
  multer().single('avatar'),
  candidatesController.create
)
candidatesRoutes.get('/', candidatesController.index)
candidatesRoutes.delete('/delete/:_id', candidatesController.delete)
candidatesRoutes.patch(
  '/:_id/avatar',
  multer().single('avatar'),
  candidatesController.avatar
)
candidatesRoutes.get('/:codigo/show', candidatesController.show)
candidatesRoutes.put('/edit/:_id', candidatesController.update)

module.exports = candidatesRoutes
