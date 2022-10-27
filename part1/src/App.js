import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [showAll, setShowAll] = useState(true);

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name === filterName);

  const addContact = (event) => {
    event.preventDefault()
    if (persons.some(el => el.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const nameObj = {
        name: newName,
        number:newNumber
      }
      setPersons(persons.concat(nameObj))
    }
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
    if(filterName ===''){
      setShowAll(true)
    }else{
      setShowAll(false)
    }
   
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with<input value={filterName} onChange={handleFilterNameChange} />
        </div>
      <h2>add a new</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {personsToShow.map(person =>
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

export default App