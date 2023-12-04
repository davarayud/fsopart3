const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name : {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number : {
    type: String,
    minlength: 8,
    required: true
  }
})

const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
  transform: (document, returnedObjet) => {
    returnedObjet.id = returnedObjet._id.toString()
    delete returnedObjet._id
    delete returnedObjet.__v
  }
})

module.exports = mongoose.model('Person', personSchema)