require('dotenv').config()
const http = require('http')
const express = require('express')

const app = express()
app.use(express.json())
var morgan = require('morgan')
const Person = require('./models/person')
// const {  
//   nextTick
// } = require('process')
app.use(express.static('build'))
app.use(express.json())

app.use(express.static('build'))


morgan.token('post', function (req) {
  if (req.method === 'POST')
    return JSON.stringify(req.body)
  else
    return ''
})

morgan.format('postFormat', ':method :url :status :res[content-length] - :response-time ms :post')

app.use(morgan('postFormat'))

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({
      error: 'name is missing'
    })
  }
  if (body.number === undefined) {
    return res.status(400).json({
      error: 'number is missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = Person.find(person => person.id === id)
  person ? res.json(person) : res.status(404).end()

  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const {
    body
  } = req

  return Person.findOne({
    _id: req.params.id
  }).then((updatedPerson) => {
    const person = updatedPerson
    person.name = body.name
    person.number = body.number
    person
      .save()
      .then((savedPerson) => {
        res.json(savedPerson.toJSON())
      })
      .catch((error) => next(error))
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  })
}

app.use(unknownEndpoint)

const errorHandle = (error, req, res, next) => {

  if (error.name === 'CastError') {
    return res.status(404).send({
      error: 'malformatted id'
    })
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message
    })
  }
  return next(error)
}

app.use(errorHandle)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
