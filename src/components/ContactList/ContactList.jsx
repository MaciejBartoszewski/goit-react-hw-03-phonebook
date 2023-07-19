import React from 'react';
import PropTypes from 'prop-types';
import css from '../ContactForm/ContactForm.module.css';

export const ContactItem = ({ id, name, number, onDelete }) => {
    const handleDelete = () => {
      onDelete(id);
    };
    return (
      <>
        <li key={id}>
          <p>
            {name}: {number}
          </p>
          <button className={css.btn} onClick={handleDelete}>Delete</button>
        </li>
      </>
    );
  };
  
  ContactItem.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
    onDelete: PropTypes.func,
  }

export const ContactList = ({ contacts, handleDelete }) => {
  return (
    <>
      <ul>
        {contacts.map(contact => {
          return (
            <ContactItem                  
              key={contact.id}
              id={contact.id}
              name={contact.name}
              number={contact.number}
              onDelete={handleDelete}
            />
          );
        })}
      </ul>
    </>
  );
};

ContactList.propTypes = {
  handleDelete: PropTypes.func,
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
  }))
}