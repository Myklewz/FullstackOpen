import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = (event) => {
    const existingName = persons.some((person) => person.name == newName);
    event.preventDefault();
    if (existingName) {
      alert(`${newName} is already in the phonebook`);
    } else {
      setPersons(persons.concat({ name: newName }));
    }
    setNewName("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}> {person.name} </div>
      ))}
    </div>
  );
};

export default App;
