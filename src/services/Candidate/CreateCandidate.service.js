const Candidates = require('../../schema/Candidates')
const AppError = require('../../errors/AppError')

const {
  transformImageFileInBase64URI,
} = require('../../util/transformImageFileInBase64URI')

class CreateCandidateService {
  async execute({
    chapa = '',
    codigo = 0,
    originalFileName = '',
    imageBuffer,
  }) {
    const findCandidate = await Candidates.findOne({ codigo })

    if (findCandidate) {
      throw new AppError('Candidato já cadastrado!')
    }

    if (chapa === '' || codigo === 0) {
      throw new AppError('Insira um nome de chapa válido!')
    }

    const imageUri = transformImageFileInBase64URI(
      originalFileName,
      imageBuffer
    )

    if (imageUri) {
      const createCandidate = new Candidates({
        chapa,
        codigo,
        avatar: imageUri,
        votos: 0,
      })

      await createCandidate.save()

      return createCandidate
    }

    throw new AppError(
      'Não foi possível criar candidato',
      400,
      'somente são aceitos arquivos de imagem .jpg ou .png'
    )
  }
}

module.exports = { CreateCandidateService }
