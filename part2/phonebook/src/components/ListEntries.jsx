import Entry from "./Entry";

const ListEntries = ({ persons, filter }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase()),
    )
    .map((person) => <Entry person={person} key={person.id} />);
};

export default ListEntries;
