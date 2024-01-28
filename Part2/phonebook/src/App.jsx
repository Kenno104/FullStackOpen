import { useState, useEffect } from 'react'
import Search from './Components/Search'
import Phonebook from './Components/Phonebook'
import personService from './Services/persons'
import Notification from './Components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [newUserMessage, setNewUserMessage] = useState('New user message appears here')
  
  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
    const filteredPersons = persons.filter(person => person.name.includes(search))
    console.log(filteredPersons)
    setPersons(filteredPersons)
  }

  const checkName = (PersonObject) => {
    if (persons.some(person => person.name === PersonObject.name)) {
      window.confirm(`${PersonObject.name} is already added to phonebook, replace the old number with a new one?`)
      const selectedPerson = persons.filter(person => person.name === PersonObject.name)
      const id = selectedPerson[0].id
      console.log('id is:', id)
      personService
        .update(id, PersonObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        })
      setNewName('')
      setNewNumber('')
    }
    else {
      personService
        .create(PersonObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const PersonObject = {
      name: newName,
      number: newNumber,
    }
    console.log('button clicked', event.target)
    console.log('number:', PersonObject.number)
    setNewUserMessage(
      `Added ${PersonObject.name}`
    )
    setTimeout(() => {
      setNewUserMessage(null)
    }, 5000)
    checkName(PersonObject)
  }

  const handleDelete = (id) => {
    window.confirm('are you sure?')
    personService
      .remove(id)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== id))
      })
    console.log(`delete ${id}`)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newUserMessage} />
      <Search search={search} handleSearch={handleSearch}/>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  type='text'
                  value={newName}
                  name={newName}
                  onChange={handleNewName} 
                />
        </div>
        <div>
          number: <input 
                    type='text'
                    value={newNumber}
                    number={newNumber}
                    onChange={handleNewNumber}
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Phonebook persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App