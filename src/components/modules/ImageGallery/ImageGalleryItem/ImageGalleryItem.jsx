import styles from './image-gallery-item.module.css';
import PropTypes from 'prop-types';
import { memo } from 'react';

const ImageGalleryItem = ({ src, alt, id, onClick }) => {
  return (
    <li className={styles['gallery-item']}>
      <img
        className={styles.image}
        src={src}
        alt={alt}
        width="100"
        onClick={() => {
          onClick(id);
        }}
      />
    </li>
  );
};

export default memo(ImageGalleryItem);

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  id: PropTypes.number,
  onClick: PropTypes.func,
};
