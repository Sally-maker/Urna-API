const VoteCandidateService = require('../../services/Candidate/VoteCandidate.service')
const {
  CreateCandidateService,
} = require('../../services/Candidate/CreateCandidate.service')
const DeleteCandidateService = require('../../services/Candidate/DeleteCandidate.service')
const UpdateCandidateAvatarService = require('../../services/Candidate/UpdateCandidateAvatar.service')
const UpdateCandidateService = require('../../services/Candidate/UpdateCandidate.service')
const Candidate = require('../../schema/Candidates')
const AppError = require('../../errors/AppError')

class CandidatesController {
  async index(request, response, next) {
    try {
      const candidates = await Candidate.find()

      const parsedCandidates = candidates.map(candidate => {
        const parsed = {
          _id: candidate._id,
          chapa: candidate.chapa,
          codigo: candidate.codigo,
          avatar: `${process.env.BASE_URL}/picture/${candidate.avatar}`,
          votos: candidate.votos,
        }

        return parsed
      })

      return response.json(parsedCandidates)
    } catch (error) {
      next(error)
    }
  }

  async show(request, response, next) {
    try {
      const { codigo } = request.params

      const candidate = await Candidate.findOne({ codigo })

      if (!candidate) {
        throw new AppError('Candidato não cadastrado')
      }

      const replacedCandidate = {
        _id: candidate._id,
        chapa: candidate.chapa,
        codigo: candidate.codigo,
        avatar: `${process.env.BASE_URL}/picture/${candidate.avatar}`,
        votos: candidate.votos,
      }

      return response.status(200).json(replacedCandidate)
    } catch (error) {
      next(error)
      return response.status(error.statusCode).json(error)
    }
  }

  async vote(request, response, next) {
    try {
      const { codigo } = request.body
      const { _id } = request.params

      const voteCandidate = new VoteCandidateService()

      const votedCandidate = await voteCandidate.execute({
        codigo,
        userId: _id,
      })

      return response.status(200).json(votedCandidate)
    } catch (error) {
      next(error)
      return response.status(400).json(error)
    }
  }

  async update(request, response, next) {
    try {
      const { chapa, codigo } = request.body
      const { _id } = request.params

      const updateCandidate = new UpdateCandidateService()

      const updatedCandidate = await updateCandidate.execute({
        _id,
        chapa,
        codigo,
      })

      return response.status(200).json(updatedCandidate)
    } catch (error) {
      next(error)
      return response.status(400).json(error)
    }
  }

  async avatar(request, response, next) {
    try {
      const { _id } = request.params
      const fileName = request.file.filename

      const updateCandidateAvatar = new UpdateCandidateAvatarService()

      const updatedCandidate = await updateCandidateAvatar.execute({
        candidateId: _id,
        filename: fileName,
      })

      return response.status(200).json(updatedCandidate)
    } catch (error) {
      next(error)
      return response.status(400).json(error)
    }
  }

  async create(request, response, next) {
    try {
      const { chapa, codigo } = request.body
      const originalFileName = request.file.originalname
      const imageBuffer = request.file.buffer

      const createCandidate = new CreateCandidateService()

      const candidate = await createCandidate.execute({
        chapa,
        codigo,
        originalFileName,
        imageBuffer,
      })

      return response.status(201).json(candidate)
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async delete(request, response, next) {
    try {
      const { _id } = request.params

      const deleteCandidate = new DeleteCandidateService()

      const messageStatus = await deleteCandidate.execute(_id)

      return response.status(200).json(messageStatus)
    } catch (error) {
      next(error)
      return response.status(400).json(error)
    }
  }
}

module.exports = { CandidatesController }
