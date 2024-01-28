import { useState, useEffect } from 'react'
import Search from './Components/Search'
import Phonebook from './Components/Phonebook'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  
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
      alert(`${PersonObject.name} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(PersonObject))
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const PersonObject = {
      name: newName,
      number: newNumber,
    }
    console.log('button clicked', event.target)
    console.log('numnber:', PersonObject.number)
    checkName(PersonObject)
    setNewName('')
    setNewNumber('')
    }

    useEffect(() => {
      console.log('effect')
      axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} handleSearch={handleSearch}/>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  name={newName}
                  onChange={handleNewName} 
                />
        </div>
        <div>
          number: <input 
                    number={newNumber}
                    onChange={handleNewNumber}
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Phonebook persons={persons} />
    </div>
  )
}

export default App