import { useState, useEffect } from "react";
import ListEntries from "./components/ListEntries";
import NewEntry from "./components/NewEntry";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    const existingName = persons.some((person) => person.name == newName);
    event.preventDefault();
    if (existingName) {
      alert(`${newName} is already in the phonebook`);
    } else {
      setPersons(
        persons.concat({
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        }),
      );
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with{" "}
      <input value={newFilter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <NewEntry
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <ListEntries persons={persons} filter={newFilter} />
    </div>
  );
};

export default App;
