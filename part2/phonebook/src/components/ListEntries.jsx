import Entry from "./Entry";

const ListEntries = ({ persons, filter, handleDeletion }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase()),
    )
    .map((person) => (
      <Entry person={person} key={person.id} handleDeletion={handleDeletion} />
    ));
};

export default ListEntries;
