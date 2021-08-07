const mongoose = require('mongoose')

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.log(`MongoDB Connection Error: ${err.message}`)
  }
}

connectToDB()

module.exports = mongoose.connection
