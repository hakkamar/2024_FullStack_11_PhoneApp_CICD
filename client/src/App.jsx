import { useState, useEffect } from "react";
import personService from "./services/persons";

import Notification from "./components/Notification";
import Filtteri from "./components/Filtteri";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Footer from "./components/Footer";
import "./index.css";

let errori = false;

function pieniksi(merkit) {
  return merkit.toLowerCase();
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [rajaus, setHalutut] = useState("");
  const [messuMessage, setMessuMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const muistionKaikkiNimet = persons.map((x) => pieniksi(x.name));
  const nimiOnJoMuistiossa = muistionKaikkiNimet.includes(pieniksi(newName));

  const halutut =
    rajaus === ""
      ? persons
      : persons.filter((x) => pieniksi(x.name).includes(pieniksi(rajaus)));

  const addNameAndNumber = (event) => {
    event.preventDefault();

    const nameAndNumberObject = {
      name: newName,
      number: newNumber,
      //id: persons.length + 1,
    };

    if (nimiOnJoMuistiossa) {
      // Nimi on jo muisiossa, joten kysytään päivitetäänkö sille uusi numero...
      const ok = window.confirm(
        `'${newName}' is already added to Phonebook. Replace the old number with a new one?`
      );
      if (ok) {
        // Saatiin lupa, joten Päivitetään...
        const muutettava = persons.find(
          (z) => pieniksi(z.name) == pieniksi(newName)
        );
        personService
          .update(muutettava.id, nameAndNumberObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
            setMessuMessage(`Updated '${updatedPerson.name}' to Phonebook.`);
          })
          .catch((error) => {
            console.log(error);
            errori = true;
            //setPersons(persons.filter((n) => n.id !== muutettava.id));
            setPersons(persons);
            //setMessuMessage(`Person '${muutettava.name}' was already removed from server (by someone else?)`);
            setMessuMessage(error.response.data.error);
          });
        setNewName("");
        setNewNumber("");
      }
    }
    // Nimi ei ole muistiossa, joten lisätään se sinne...
    else {
      personService
        .create(nameAndNumberObject)
        .then((createdPersons) => {
          setPersons(persons.concat(createdPersons));
          setMessuMessage(`Added '${createdPersons.name}' to Phonebook.`);
        })
        .catch((error) => {
          //console.log(error);
          errori = true;
          setPersons(
            persons.filter((n) => n.name !== nameAndNumberObject.name)
          );
          //setMessuMessage(`Add '${nameAndNumberObject.name}' to Phonebook fails...`);
          setMessuMessage(error.response.data.error);
        });
      setNewName("");
      setNewNumber("");
    }
    setTimeout(() => {
      setMessuMessage(null);
      errori = false;
    }, 5000);
  };

  const deleteNameAndNumberOf = (potenttiaalinenPoistettava) => {
    if (window.confirm(`Delete ${potenttiaalinenPoistettava.name} ?`)) {
      personService
        .poista(potenttiaalinenPoistettava.id)
        .then(() => {
          personService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
            setMessuMessage(
              `Deleted '${potenttiaalinenPoistettava.name}' from Phonebook.`
            );
          });
        })
        .catch((error) => {
          //console.log(error);
          errori = true;
          setPersons(
            persons.filter((n) => n.name !== potenttiaalinenPoistettava.name)
          );
          //setMessuMessage(`Person '${potenttiaalinenPoistettava.name}' delete fails....`);
          setMessuMessage(error.response.data.error);
        });
    }
    setTimeout(() => {
      setMessuMessage(null);
      errori = false;
    }, 5000);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFiltteri = (event) => {
    setHalutut(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={messuMessage} errori={errori} />
      <Filtteri value={rajaus} onChange={handleFiltteri} />
      <h3>Add a New</h3>
      <PersonForm
        onSubmit={addNameAndNumber}
        value={newName}
        onChange={handleNameChange}
        value2={newNumber}
        onChange2={handleNumberChange}
      />
      <h3>Numbers</h3>
      {halutut.map((x) => (
        <Persons
          key={x.id}
          haluttu={x}
          deleteNameAndNumber={() => deleteNameAndNumberOf(x)}
        />
      ))}
      <Footer />
    </div>
  );
};

export default App;
