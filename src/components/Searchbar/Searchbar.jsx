import { Component } from 'react';
import propTypes from 'prop-types';
import style from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoSearch } from "react-icons/io5";

export class Searchbar extends Component {
  state = { query: '' };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase().trim() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    const { onSubmit } = this.props;

    if (query === '') {
      toast.error('Enter what you want to find please');
      return;
    }

    onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.handleSubmit} autoComplete="off">
          <button type="submit" className={style.SearchForm_button}>
          <IoSearch className={style.icon}/>
          </button>
    
          <input
            className={style.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};


