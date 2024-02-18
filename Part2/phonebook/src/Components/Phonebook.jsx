import Contact from './Contact'

const Phonebook = ({ persons, handleDelete }) => {
    return (
      <div>
      <h2>Numbers</h2>
          {persons.map(person => 
            <Contact key={person.id} person={person} name={person.name} number={person.number} handleDelete={handleDelete} />
          )}
      </div>
    )
  }

  export default Phonebook