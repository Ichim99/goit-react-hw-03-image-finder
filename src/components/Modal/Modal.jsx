
import { Component } from 'react';
import propTypes from 'prop-types';
import style from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={style.Overlay} onClick={this.handleOverlayClick}>
        <div className={style.Modal}>{this.props.children}</div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: propTypes.node.isRequired,
};

