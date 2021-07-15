const mongoose = require('mongoose')

mongoose
  .createConnection(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Rodando banco de dados'))
