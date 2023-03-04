import styles from './searchbar.module.css';
import { ReactSVG } from 'react-svg';
import { memo, useState } from 'react';
import magnifyingGlass from '../../../shared/images/svg/magnifying-glass.svg';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const { value } = e.target.elements.search;
    onSubmit(value.trim());
  };

  const handleChange = e => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.wrapper}>
          <input
            className={styles.field}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={handleChange}
          />
          <button type="submit" className={styles.button}>
            <ReactSVG className={styles.image} src={magnifyingGlass} />
          </button>
        </div>
      </form>
    </header>
  );
};

export default memo(Searchbar);

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
