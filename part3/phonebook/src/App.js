import React,{ userState, useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () =>{
  const [ persons, setPersons] = useState([])

const hook = () => {
  personService
  .getAll()
  .then( intialPersons => {setPersons(intialPersons)})
  .catch((error) => console.log(error))
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
        personService
        .update(person.id,updatedPerson)
        .then((returnedPerson)=>{
          setPersons(persons
          .filter((p) => p.name !== updatedPerson.name)
          .concat(returnedPerson))
          setNewNotification({
           text: `${updatedPerson.name} number was updated to ${updatedPerson.number}!`,
           type: "success"
          }
          )
          setTimeout(() => setNewNotification(null),5000)
        })
        .catch((error) =>{
          setPersons(persons.filter((p) => p.name !== person.name));
          setNewNotification({
            text: `${person.name} has already been removed from the server!`,
            type: "error"  
          })
          setTimeout(() => {
            setNewNotification(null)
          }, 5000);
        })
      }
      return
    } 

    const contactObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),      
    }

    personService
    .create(contactObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
       //setNewNotification(`Added ${contactObject.name}`)
       setNewNotification(
          {
          text: `Added ${contactObject.name}`,
          type: "success"  
        })

      setTimeout(() => {
        setNewNotification(null)
      }, 5000);
    })
     .catch((error) => {
      setNewNotification({
        text: error.response.data.error,
        type: "error",
      });
    })
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
   
   const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (confirmDelete) {
      personService.xdelete(id).then(() => {
        //Update state --> filter out deleted person
        const filteredP = persons.filter((person) => person.id !== id);
        setPersons(filteredP);


        setNewNotification({
          text: `${person.name} has been removed from the server!`,
          type: "success"  
        })


        // reset filter
        setNewFilter("");
      });
    }
  };
  return(
    <div>
      <h1>Phonebook</h1>
      <Notification message={newNotification} />
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
             <Persons key={person.id} person={person} onClick={()=> handleDelete(person.id)}/>
            )}
        </ul>
      </div>
    </div>
  )
}
export default App
