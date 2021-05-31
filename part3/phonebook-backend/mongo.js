const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.iugj5.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
  date: new Date(),
})

if (process.argv.length <= 3) {
  Person
    .find({})
    .then(persons => {
      console.log('phonebook:')
      persons.map(person => {
        console.log(person.name,' ',person.number)
        mongoose.connection.close()
      })       
    })
}else{
  person.save().then(() => {
    console.log('contact saved!')
    mongoose.connection.close()
  })
}