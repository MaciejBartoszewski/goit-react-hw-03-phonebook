import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddContact = contactData => {
    const id = nanoid();
    const newContact = { id, ...contactData };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  handleFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  handleDelete = id => {
    this.setState(prevState => {
      const contactListAfterDelete = prevState.contacts.filter(
        contact => contact.id !== id
      );
      return { contacts: contactListAfterDelete };
    });
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }
  
  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
  
  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = this.handleFilteredContacts();
    return (
      <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101'
      }}
    >
        <h1>Phonebook</h1>
        <ContactForm
          handleAddContact={this.handleAddContact}
          contacts={contacts}
        ></ContactForm>
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.handleFilter}></Filter>
        <ContactList
          handleDelete={this.handleDelete}
          contacts={filteredContacts}
        />
      </div>
    );
  };
}
