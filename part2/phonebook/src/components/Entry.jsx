const Entry = ({ person, handleDeletion }) => {
  return (
    <div>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDeletion(person)}>delete</button>
    </div>
  );
};

export default Entry;
