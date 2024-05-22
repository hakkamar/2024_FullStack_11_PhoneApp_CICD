const Filtteri = ({ value, onChange }) => {
  return (
    <form className="formi">
      <div>
        filter shown with: <input value={value} onChange={onChange} />
      </div>
    </form>
  );
};

export default Filtteri;
