const Candidates = require('../schema/Candidates')
const AppError = require('../errors/AppError')
const fs = require('fs')
const path = require('path')

class CreateCandidateService {
  async execute({ chapa = '', codigo = 0, avatar = '' }) {
    const findCandidate = await Candidates.findOne({ codigo })

    if (findCandidate) {
      throw new AppError('Candidato já cadastrado!')
    }

    if (chapa === '' || codigo === 0) {
      throw new AppError('Insira um nome de chapa válido!')
    }

    if (avatar.length === 0) {
      throw new AppError('Imagem de candidato não cadastrada!')
    }

    const createCandidate = new Candidates({
      chapa,
      codigo,
      avatar,
      votos: 0,
    })

    const folderUploads = path.resolve(__dirname, '..', '..', 'uploads')
    const folderExists = await fs.promises.stat(folderUploads)

    if (!folderExists) {
      await fs.promises.mkdir(folderUploads)
    }

    await createCandidate.save()

    return createCandidate
  }
}

module.exports = CreateCandidateService
