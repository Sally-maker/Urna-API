const { Schema, model } = require('mongoose')

const Users = model(
  'usuarios',
  new Schema({
    codigo: String,
    votou: Boolean,
    tipo: String,
  })
)

module.exports = { Users }
