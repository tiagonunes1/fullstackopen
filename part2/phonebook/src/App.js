import React,{ userState, useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () =>{
  const [ persons, setPersons] = useState([])

const hook = () => {
  personService
  .getAll()
  .then( intialPersons => {setPersons(intialPersons)})
  .catch((error) => console.log(error))
  // axios
  // .get('http://localhost:3002/persons')
  // .then(result => {
  //   setPersons(result.data)
  // })
}
  
useEffect(hook,[])

  const [showAll, setShowAll] = useState(true)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newNotification, setNewNotification] = useState(null)
  
  const addContact = (event) => {
    event.preventDefault()


    const equalName = (p1, p2) =>
      p1.toLowerCase() === p2.toLowerCase();

      const person = persons.find((person) =>
      equalName(person.name, newName)
    );

    if (person){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) { 
        const updatedPerson = {...person, number : newNumber,name : newName};
        console.log(updatedPerson)
        personService
        .update(person.id,updatedPerson)
        .then((returnedPerson)=>{
          setPersons(persons
          .filter((p) => p.name !== updatedPerson.name)
          .concat(returnedPerson))
          setNewNotification({
            text: `${updatedPerson.name} number was updated to ${updatedPerson.number}!`,
            type: "success"
          })
          setTimeout(() => setNewNotification(null),5000)
        })
        .catch((error) =>{
          setPersons(persons.filter((p) => p.name !== person.name));
          setNewNotification({
            text: `${person.name} was already deleted from the server!`,
            type: "error"  
          })
          setTimeout(() => {
            setNewNotification(null)
          }, 5000);
        })
      }
      return
    }

    // const exists = persons.some(person => person.name === newName && person.number !== newNumber)
    // alert(exists)
    //  if (exists){
    //   window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) 
    //   ? personService
    //     .update(newNumber)
    //     .then(() => alert(`${newName} number is now ${newNumber}!`) )
    //     .catch((error) => console.log(error))
    //     : console.log('canceled')
    //     return false
    // }




    // NOVA VALIDAÇÃO

    // if(persons.some(person => person.name === newName)){
    //   alert(`${newName} is already added to phonebook`)
    //     return false
    // }

  

    const contactObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),      
    }

    personService
    .create(contactObject)
    .then(returnedPerson => {
      console.log(returnedPerson)
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
    .catch((error) => alert(`Error adding contact`) )
    // setPersons(persons.concat(contactObject))
    
  }

  const handleNewContact = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNewFilter = (event) => {
     setShowAll(!showAll)
     setNewFilter(event.target.value)
  }

   const contactsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase() === newFilter.toLowerCase())
   
  // console.log(contactsToShow)  
  return(
    <div>
      <h1>Phonebook</h1>
      {/* <div> filter shown with <input  value={newFilter} onChange={handleNewFilter} /></div><br></br> */}
      <Filter value={newFilter} onChange={handleNewFilter} />
      <h2>add new</h2>
      <form onSubmit={ addContact }>
        <PersonForm text="Name" value ={newName} onChange={handleNewContact} />
        <PersonForm text="Number" value ={newNumber} onChange={handleNewNumber}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {contactsToShow.map( person => 
             <Persons key={person.id} person={person} onClick={() => {
              window.confirm(`Delete ${person.name}?`) 
              ? personService
              .xdelete(person.id)
              .then(() => alert(`${person.name} was deleted!`))
              .catch((error => console.log(error)))
              : console.log('canceled')
             }}/>
            )}
        </ul>
      </div>
    </div>
  )
}
export default App
