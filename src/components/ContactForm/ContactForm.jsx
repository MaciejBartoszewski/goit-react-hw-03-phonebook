import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css'; 


export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  changeHandler = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  submitHandler = event => {
    const { handleAddContact, contacts } = this.props;
    event.preventDefault();

    contacts.some(contact => contact.name === this.state.name)
      ? alert(`${this.state.name} is already in contacts`)
      : handleAddContact({ ...this.state });

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.submitHandler}>
          <label>
            Name
            <input
              className={css.input}
              type="text"
              name="name"
              pattern="^[A-Za-z.'\- ]+$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={this.state.name}
              onChange={this.changeHandler}
            />
          </label>
          <label>
            Number
            <input
              className={css.input}
              type="tel"
              name="number"
              pattern="^\+?\d{1,4}?\s?\(?\d{1,4}?\)?\s?\d{1,4}\s?\d{1,4}\s?\d{1,9}$"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={this.state.number}
              onChange={this.changeHandler}
            />
          </label>
          <button className={css.btn}>Add contact</button>
        </form>
      </>
    );
  }
}

ContactForm.propTypes = {
  handleAddContact: PropTypes.func,
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
  }))
}
