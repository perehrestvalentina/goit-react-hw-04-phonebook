import { useState, useEffect } from 'react';
import shortid from 'shortid';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import css from './App.module.css';

const initalContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? initalContacts
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = (name, number) => {
    const inputContacts = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (!inputContacts) {
      setContacts(prevState => [
        ...prevState,
        { id: shortid.generate(), name, number },
      ]);
      return true;
    }

    alert(`${name} is already in contacts`);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const getNormaliseContacts = () =>
    contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );

  const newContacts = getNormaliseContacts();

  return (
    <div>
      <h1 className={css.title}> Phonebook</h1>
      <ContactForm onSubmit={addNewContact} />
      <h2 className={css.title}>Contacts</h2>

      {contacts.length > 0 ? (
        <Filter
          value={filter}
          onChange={event => setFilter(event.currentTarget.value)}
        />
      ) : (
        <p className={css.title}>{'The list is empty '}</p>
      )}

      <ContactList
        contacts={newContacts}
        onDeleteInputContact={deleteContact}
      />
    </div>
  );
};
export default App;
