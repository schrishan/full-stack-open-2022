import { useEffect, useState } from 'react'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

import axios from 'axios';


const App = () => {
  const [persons, setPersons] =useState([]);
  const [filterName, setFilterName] = useState('');
  const [showAll, setShowAll] = useState(true);

    const hook = () => {
      console.log('effect');
      axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
    }
    useEffect(hook, [])

    const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name === filterName);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName} setShowAll={setShowAll}/>
      <h2>add a new</h2>
      <PersonForm persons={persons} getPersons={setPersons}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App