const { compare } = require('bcrypt')

async function EncryptedVote(voto, encryptedVote) {
  return compare(voto, encryptedVote)
}

module.exports = EncryptedVote
