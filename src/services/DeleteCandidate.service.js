const Candidates = require('../schema/Candidates')
const AppError = require('../errors/AppError')
const fs = require('fs')
const path = require('path')

class DeleteCandidateService {
  async execute(candidateId = 0) {
    const findCandidate = await Candidates.findById(candidateId)

    if (!findCandidate) {
      throw new AppError('Candidato não cadastrado')
    }

    const avatarPath = path.resolve(
      __dirname,
      '..',
      '..',
      'uploads',
      findCandidate.avatar
    )

    const fileExists = fs.existsSync(avatarPath)

    if (fileExists) {
      await fs.promises.unlink(avatarPath)
    }

    const excludeCandidate = new Candidates(findCandidate)

    await excludeCandidate.delete()

    const messageSuccess = new AppError('Candidato deletado com sucesso', 200)

    return messageSuccess
  }
}

module.exports = DeleteCandidateService
