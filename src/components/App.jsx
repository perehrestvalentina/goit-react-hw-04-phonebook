import { useState, useEffect } from 'react';
import shortid from 'shortid';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import css from './App.module.css';

const initalContacts = [];

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? initalContacts
    );
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function addNewContact(contact) {
    const inputContacts = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (inputContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    const newPerson = {
      id: shortid.generate(),
      contact,
    };
    setContacts([newPerson, ...contacts]);
  }

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const getNormaliseContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const newContacts = getNormaliseContacts();

  return (
    <div>
      <h1 className={css.title}> Phonebook</h1>
      <ContactForm onSubmit={addNewContact} />
      <h2 className={css.title}>Contacts</h2>

      {contacts.length !== 0 ? (
        <Filter value={filter} onChange={e => setFilter(e.target.value)} />
      ) : (
        <p className={css.title}>{'The list is empty '}</p>
      )}

      <ContactList
        contacts={newContacts}
        onDeleteInputContact={deleteContact}
      />
    </div>
  );
}
