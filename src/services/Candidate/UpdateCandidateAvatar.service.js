const fs = require('fs')
const path = require('path')
const Candidates = require('../../schema/Candidates')
const AppError = require('../../errors/AppError')

class UpdateCandidateAvatarService {
  async execute({ filename = '', candidateId = 0 }) {
    const candidateExists = await Candidates.findById(candidateId)

    if (!candidateExists) {
      throw new AppError('Candidato não cadastrado')
    }

    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      'uploads',
      candidateExists.avatar
    )

    const existsFile = await fs.promises.stat(filePath)

    if (existsFile) {
      await fs.promises.unlink(filePath)
    }

    candidateExists.avatar = filename

    const updatedCandidate = new Candidates(candidateExists)

    await updatedCandidate.save()

    const replacedCandidate = {
      _id: updatedCandidate._id,
      chapa: updatedCandidate.chapa,
      codigo: updatedCandidate.codigo,
      avatar: `${process.env.BASE_URL}/picture${updatedCandidate.avatar}`,
      votos: updatedCandidate.votos,
    }

    return replacedCandidate
  }
}

module.exports = UpdateCandidateAvatarService
