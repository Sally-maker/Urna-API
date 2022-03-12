const { Schema, model } = require('mongoose')

const Candidate = model(
  'candidatos',
  new Schema({
    chapa: String,
    codigo: Number,
    votos: Number,
    avatar: String,
  })
)

module.exports = Candidate
