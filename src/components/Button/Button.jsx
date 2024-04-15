import propTypes from 'prop-types';
import  style  from './Button.modal.css';

export const Button = ({ onClick }) => {
  return (
    <button type="button" className={style.Button} onClick={onClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: propTypes.func.isRequired,
};