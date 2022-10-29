import { useState } from 'react'

const PersonForm = (props) => {

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const addContact = (event) => {
        event.preventDefault()
        if (props.persons.some(el => el.name === newName)) {
            alert(`${newName} is already added to phonebook`);
        } else {
            const nameObj = {
                name: newName,
                number: newNumber,
                id: Math.max(...props.persons.map(obj => obj.id)) + 1
            }
            props.getPersons(props.persons.concat(nameObj));
        }
        setNewName('');
        setNewNumber('');
    }

    return (
        <>
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
        </>
    )
}

export default PersonForm;