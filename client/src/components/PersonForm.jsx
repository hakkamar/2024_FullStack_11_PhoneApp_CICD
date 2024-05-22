const PersonForm = ({ onSubmit, value, onChange, value2, onChange2 }) => {
  return (
    <form className="formi" onSubmit={onSubmit}>
      <div>
        name: <input value={value} onChange={onChange} />
      </div>
      <div>
        number: <input value={value2} onChange={onChange2} />
      </div>
      <br></br>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
