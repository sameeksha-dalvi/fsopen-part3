const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI


mongoose.connect(url, { family: 4 })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)


// if (process.argv.length == 3) {// only password
//     Person.find({}).then(result => {
//         console.log('phonebook:')
//         result.forEach(person => {
//             console.log(`${person.name} ${person.number}`)
//         })
//         mongoose.connection.close()
//     })
// }

// if (process.argv.length == 5) {//  password name and number
//     const nameInput = process.argv[3]
//     const numberInput = process.argv[4]
//     const person = new Person({
//         name: nameInput,
//         number: numberInput,
//     })

//     person.save().then(result => {
//         console.log(`added ${nameInput} number ${numberInput} to phonebook`)
//         mongoose.connection.close()
//     })

// }
