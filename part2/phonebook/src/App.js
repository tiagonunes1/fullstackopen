import React,{ userState, useState } from 'react'
import Contact from './components/Contact'

const App = () =>{
  const [ persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    var uniq = persons.map((name) => {
    return {
      count: 1,
      name: name
    }
  })
  .reduce((a, b) => {
    a[b.name] = (a[b.name] || 0) + b.count
    return a
  }, {})

  var duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1)
  if (duplicates.length > 0){
    alert(`${newName} is already added to phonebook`)
  } 
  
// console.log(duplicates) // [ 'Nancy' ]
    
    const contactObject = {
      name: newName,
      date: new Date().toISOString(),      
      id: persons.length + 1,
    }
    setPersons(persons.concat(contactObject))
    setNewName('')
    console.log(persons)
  }

  const handleNewContact = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return(
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={ addContact } value={newName} onChange={handleNewContact}>
        <div>
          Name: <input/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map( person => 
             <Contact key={person.id} person={person}/>
            )}
        </ul>
      </div>

    </div>
  )
}
export default App
