import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = (props) => {
  const {
    filterText,
    inStockOnly,
    onFilterTextChange,
    onInStockChange,
  } = props;

  const handleFilterTextchange = function (e) {
    const { value } = e.target;
    onFilterTextChange(value);
  };

  const handleInStockChange = function (e) {
    const { checked } = e.target;
    onInStockChange(checked);
  };

  return (
    <form>
      <div>
        <label htmlFor="inputSearch">
          <input
            type="text"
            id="inputSearch"
            name="inputSearch"
            placeholder="sSearch..."
            onChange={handleFilterTextchange}
            value={filterText}
          />
        </label>
      </div>
      <div style={{ display: 'flex' }}>
        <input
          type="checkbox"
          id="vehicle1"
          name="vehicle"
          value="Bike"
          onChange={handleInStockChange}
        />
        <p>Only show products in stock</p>
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  inStockOnly: PropTypes.bool.isRequired,
  onFilterTextChange: PropTypes.func.isRequired,
  onInStockChange: PropTypes.func.isRequired,
};

export default SearchBar;
