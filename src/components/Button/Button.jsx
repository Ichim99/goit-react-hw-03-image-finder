import propTypes from 'prop-types';
import  style  from './Button.modal.css';
import { Component } from 'react';

export class Button extends Component {
  render() {
    return (
      <button
        type="button"
        className={style.Button}
        onClick={this.props.onNextPage}
      >
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onNextPage: propTypes.func,
};