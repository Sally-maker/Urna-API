const Candidates = require('../schema/Candidates')
const AppError = require('../errors/AppError')

class UpdateCandidateService {
  async execute({ _id = '', chapa = '', codigo = '' }) {
    if (!_id) {
      throw new AppError('ID não providenciado')
    }

    const findCandidate = await Candidates.findById(_id)

    if (!findCandidate) {
      throw new AppError('Candidato não cadastrado')
    }

    findCandidate.chapa = chapa
    findCandidate.codigo = codigo

    const updatedCandidate = new Candidates(findCandidate)

    await updatedCandidate.save()

    return updatedCandidate
  }
}

module.exports = UpdateCandidateService
