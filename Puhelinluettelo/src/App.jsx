import { useState, useEffect } from 'react'
import personService from './services/personService'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.error("Error fetching data: ", error)
      });
  }, [])

  const deletePerson = (person) => {
    if (confirm(`Delete ${person.name} ?`)) {
      personService.remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id)); //Uusi tilamuuttuja
        })
        .catch(error => {
          console.error("Error deleting person: ", error);
        });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
  
    // Check for empty name
    if (newName.trim() === '') {
      alert('Name cannot be empty');
      return;
    }
  
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const confirmReplace = confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
  
      if (confirmReplace) {
        optionalNumberChange(existingPerson.id, newNumber);
      }
    } 
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
  
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error("Error creating person: ", error);
        });
    }
  };

  const optionalNumberChange = (id, newNumber) => {
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, number: newNumber }
  
    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
      .catch(error => {
        console.log(error)
      })
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }
  const normalizedSearchTerm = searchTerm.toLowerCase();

  const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(normalizedSearchTerm)
  );
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <Filter handleSearch={handleSearch}/>
        <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
        <div>
        <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map(person => 
            <Person key={person.id} person={person} deletePerson={() => deletePerson(person)} />
        )}
      </div>
    </div>
  )
}

export default App