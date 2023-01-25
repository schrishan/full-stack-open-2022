import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook.service";

const App = () => {
  const [newContact, setNewContact] = useState({
    id: null,
    name: "",
    number: "",
  });
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [flterValue, setFlterValue] = useState("");
  const [phoneNumbersToShow, setPhoneNumbersToShow] = useState([]);

  useEffect(() => {
    phonebookService.getAll().then((initialPhoneNumbers) => {
      setPhoneNumbers(initialPhoneNumbers);
      setPhoneNumbersToShow(initialPhoneNumbers);
    });
  }, []);
  const elOnChange = (e) => {
    setNewContact((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const addNewNumber = (event) => {
    event.preventDefault();
    const contactFound = phoneNumbers.some(
      (obj) => obj.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (contactFound) {
      if (
        window.confirm(
          `${newContact.name} already added to phonebook, replace the old number with a new one?`
        ) == true
      ) {
        let contact = phoneNumbers.find((obj) => obj.name.toLowerCase() === newContact.name.toLowerCase())
        const changedContact = { ...contact, number: newContact.number}
          console.log('contact',contact);
          console.log('changedContact',changedContact);
          console.log('contactFound',contactFound);

          phonebookService
          .update(changedContact.id, changedContact).then(returnedContact => {
                    const contactIndex = phoneNumbers.findIndex(obj => {
          return obj.name.toLowerCase() === newContact.name.toLowerCase();
        });
            phoneNumbers[contactIndex]['number'] = returnedContact.number;
            setPhoneNumbers(phoneNumbers);
            setNewContact({ id: null, name: "", number: "" });  
          }).catch(error => {
            alert(
              `the contact was already deleted from server`
            )
          })
      }
    } else{
      setNewContact((prevData) => ({
        ...prevData,
        id: phoneNumbers.length + 1,
      }));
      phonebookService.create(newContact).then((returnedContact) => {
        setPhoneNumbers(phoneNumbers.concat(returnedContact));
        setPhoneNumbersToShow(phoneNumbers.concat(returnedContact));
        setNewContact({ id: null, name: "", number: "" });
      });
    }
  };

  const deleteContact = (id, name, event) => {
    if (window.confirm(`Delete ${name} ?`) == true) {
      phonebookService.remove(id).then((returnedContacts) => {
        setPhoneNumbers(phoneNumbers.filter((item) => item.id !== id));
        setPhoneNumbersToShow(phoneNumbers.filter((item) => item.id !== id));
      });
    } else {
      return false;
    }
  };

  const handleSearch = (event) => {
    setPhoneNumbersToShow(
      phoneNumbers.filter((item) => {
        return (
          item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !==
          -1
        );
      })
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div className="fillter-wrp">
        <label>filter showen with </label>
        <input onChange={handleSearch} />
      </div>
      <br />
      <form onSubmit={addNewNumber}>
        <label>
          name{" "}
          <input name="name" value={newContact.name} onChange={elOnChange} />
        </label>
        <br />
        <label>
          number{" "}
          <input
            name="number"
            value={newContact.number}
            onChange={elOnChange}
          />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
      <br />
      <h2>Numbers</h2>
      <ul>
        {phoneNumbersToShow.map((number) => (
          <li key={number.id}>
            {number.name} {number.number}{" "}
            <button
              onClick={(event) => deleteContact(number.id, number.name, event)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
