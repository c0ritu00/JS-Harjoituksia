import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
 
  const addPerson = (event) => {
    event.preventDefault()

    //Check for empty name and if it exists
    if (newName.trim() === '') {
      alert('Name cannot be empty');
      return;
    } 
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`) //Backticks for using variables inside a string
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

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
            <Person key={person.id} person={person} />
        )}
      </div>
    </div>
  )
}

export default App