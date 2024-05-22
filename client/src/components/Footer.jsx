const Footer = () => {
  const footerStyle = {
    color: "black",
    fontStyle: "italic",
    fontSize: 12,
    textAlign: "center",
  };

  return (
    <div style={footerStyle}>
      <br />
      <hr></hr>
      <em>Puhelinmuistio ( FullStackOpen harjoitus ), Hakkis 1/2024</em>
      <hr></hr>
    </div>
  );
};

export default Footer;
