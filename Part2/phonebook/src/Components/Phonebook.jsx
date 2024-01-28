import Contact from './Contact'

const Phonebook = ({ persons }) => {
    return (
      <div>
      <h2>Numbers</h2>
          {persons.map(person => 
            <Contact key={person.name} name={person.name} number={person.number} />
          )}
      </div>
    )
  }

  export default Phonebook