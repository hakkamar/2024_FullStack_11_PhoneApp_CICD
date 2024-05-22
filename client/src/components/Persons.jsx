const Persons = ({ haluttu, deleteNameAndNumber }) => {
  //console.log("Persons", haluttu);
  return (
    <div>
      {haluttu.name} {haluttu.number} {}
      <button onClick={deleteNameAndNumber}>Delete</button>
    </div>
  );
};

export default Persons;
