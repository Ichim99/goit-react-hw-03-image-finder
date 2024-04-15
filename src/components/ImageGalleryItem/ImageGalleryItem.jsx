import propTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ tags, preview, largeImage, onClick }) => {
  return (
    <li className={style.ImageGalleryItem}>
      <img
        className={style.ImageGalleryItem_image}
        src={preview}
        alt={tags}
        onClick={() => {
          onClick(largeImage);
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImage: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  preview: propTypes.string.isRequired,
  onClick: propTypes.func,
};