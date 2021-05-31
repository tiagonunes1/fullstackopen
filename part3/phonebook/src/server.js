const http = require('http')
const express = require('express')
const {response} = require('express')
const { appendFile } = require('fs')
const app = express();
app.use(express.json())
var morgan = require('morgan')


//  app.use(morgan('tiny'));

let persons = [
          {
            "name": "Arto Hellas",
            "number": "040-123456",
            "id": 1
          },
          {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": 2
          },
          {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": 3
          },
          {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": 4
          },
          {
            "name": "novo contacto",
            "number": "askdka",
            "date": "2021-05-20T22:08:48.756Z",
            "id": 7
          },
          {
            "name": "tiago asdads",
            "number": "kjasdnjo",
            "date": "2021-05-20T22:10:18.993Z",
            "id": 9
          },
          {
            "name": "adhhh",
            "number": "",
            "date": "2021-05-20T22:50:55.867Z",
            "id": 11
          },
          {
            "name": "asdsa",
            "number": "",
            "date": "2021-05-20T22:51:57.493Z",
            "id": 13
          },
          {
            "name": "hjmjhgfdsg",
            "number": "",
            "date": "2021-05-20T22:52:23.561Z",
            "id": 14
          },
          {
            "name": "fghgf",
            "number": "hgfdghh",
            "date": "2021-05-20T22:52:46.263Z",
            "id": 15
          },
          {
            "name": "asfdgshngf",
            "number": "",
            "date": "2021-05-20T22:53:14.907Z",
            "id": 16
          },
          {
            "name": "hfdsdfg",
            "number": "",
            "date": "2021-05-20T22:55:46.281Z",
            "id": 19
          },
          {
            "name": "gfgg",
            "number": "",
            "date": "2021-05-20T22:56:11.888Z",
            "id": 20
          },
          {
            "name": "",
            "number": "fdgdgfdgdf",
            "date": "2021-05-20T22:56:37.606Z",
            "id": 21
          },
          {
            "name": "asdasdsadsa",
            "number": "",
            "date": "2021-05-20T22:57:10.667Z",
            "id": 22
          },
          {
            "name": "dsfdghfngmhgjh",
            "number": "fdgdghmgjh",
            "date": "2021-05-20T23:09:15.126Z",
            "id": 24
          }
]


app.use(express.static('build'))


morgan.token('post', function (req){
	if(req.method === 'POST')
		return JSON.stringify(req.body)
	else
		return ''
})

morgan.format('postFormat',':method :url :status :res[content-length] - :response-time ms :post')

app.use(morgan('postFormat'))


const generateId = () => {
    // const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0
    const min = Math.min(...persons.map(n => n.id))
    const max = Math.max(...persons.map(n => n.id))
    const newId = Math.random() * (max - min) + min
    return newId
}

app.post('/api/persons',(req,res) => {
    const body = req.body
    const personValid = persons.find(person =>
      //equalName(person.name, newName) per 
      person.name === body.name
    );

     if (personValid) return res.status(400).json({error:'name must be unique'})


    if (!body.name){
        return res.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number){
        return res.status(400).json({
            error: 'number missing'
        })
    }

    const person = {
        name : body.name,
        number : body.number,
        date: new Date(),
        id: generateId() 
    }
    persons = persons.concat(person)
    res.json(person)
})


app.get('/',(req,res) => {
    res.json(persons)
})
app.get('/api/persons',(req,res) => {
  res.json(persons)
})

app.get('/api/persons/:id',(req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    person ? res.json(person) : res.status(404).end() 
  })
  
app.delete('/api/persons/:id',(req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id )
    res.status(404).end()
})

app.get('/info',(req,res) => {
    const xdate = new Date()
    console.log(persons.length)
    const html = '<div>Phonebook has info for '+persons.length+' people</div><p>'+xdate+'</p>'
  res.send(html)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)