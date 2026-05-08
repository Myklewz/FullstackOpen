import { useState, useEffect } from "react";
import ListEntries from "./components/ListEntries";
import NewEntry from "./components/NewEntry";
import axios from "axios";
import entries from "./services/entries";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState({ message: null, type: null });

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
          .then(
            (response) =>
              setPersons(
                persons.map((p) => (p.id === person.id ? response : p)),
              ),
            setMessage({
              message: `Changed the number of ${changedPerson.name} to ${changedPerson.number}`,
              type: "info",
            }),
            setTimeout(() => {
              setMessage({ message: null, type: null });
            }, 5000),
          )
          .catch((error) => {
            setMessage({
              message: `Information of ${person.name} has already been removed from the server`,
              type: "error",
            });
            setTimeout(() => {
              setMessage({ message: null, type: null });
            }, 5000);
          });
      }
    } else {
      entries.create({ name: newName, number: newNumber }).then((response) => {
        setPersons(persons.concat(response));
        setMessage({
          message: `${response.name} has been added`,
          type: "info",
        });
        setTimeout(() => {
          setMessage({ message: null, type: null });
        }, 5000);
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDeletion = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      entries
        .remove(person.id)
        .then(
          setPersons(persons.filter((p) => p.id != person.id)),
          setMessage({
            message: `${person.name} has been deleted`,
            type: "info",
          }),
          setTimeout(() => {
            setMessage({ message: null, type: null });
          }, 5000),
        )
        .catch((error) => {
          (setMessage({
            message: `${person.name} has already been deleted`,
            type: "error",
          }),
            setTimeout(() => {
              setMessage({ message: null, type: null });
            }, 5000));
        });
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
      <Notification message={message} />
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
