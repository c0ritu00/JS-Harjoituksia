const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange }) => {
    return (
        <>
        <h2>Add new</h2>
        <div>
            name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        </>
    )
}

export default PersonForm