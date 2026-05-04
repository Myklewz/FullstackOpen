import { useState, useEffect } from "react";
import ListEntries from "./components/ListEntries";
import NewEntry from "./components/NewEntry";
import axios from "axios";
import entries from "./services/entries";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    entries.getAll().then((initialData) => setPersons(initialData));
  }, []);

  const handleSubmit = (event) => {
    const existingName = persons.some((person) => person.name == newName);
    event.preventDefault();
    if (existingName) {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Replace the old number with the new one?`,
        )
      ) {
        const person = persons.find((n) => n.name === newName);
        const changedPerson = { ...person, number: newNumber };
        entries
          .change(person.id, changedPerson)
          .then((response) =>
            setPersons(persons.map((p) => (p.id === person.id ? response : p))),
          );
      }
    } else {
      entries.create({ name: newName, number: newNumber }).then((response) => {
        setPersons(persons.concat(response));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDeletion = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      entries
        .remove(person.id)
        .then(setPersons(persons.filter((p) => p.id != person.id)));
    } else {
    }
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
      <ListEntries
        persons={persons}
        filter={newFilter}
        handleDeletion={handleDeletion}
      />
    </div>
  );
};

export default App;
