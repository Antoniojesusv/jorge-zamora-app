import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './table/SearchBar';
import ProductTable from './table/ProductTable';

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      filterText: '',
      inStockOnly: false,
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockOnly = this.handleInStockOnly.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText,
    });
  }

  handleInStockOnly(inStockOnly) {
    this.setState({
      inStockOnly,
    });
  }

  render() {
    const { products } = this.props;
    const { filterText, inStockOnly } = this.state;
    return (
      <div>
        <SearchBar
          filterText={filterText}
          inStockOnly={inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockOnly}
        />
        <ProductTable
          filterText={filterText}
          inStockOnly={inStockOnly}
          products={products}
        />
      </div>
    );
  }
}

const product = PropTypes.shape({
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  stocked: PropTypes.bool.isRequired,
}).isRequired;

FilterableProductTable.propTypes = {
  products: PropTypes.arrayOf(product).isRequired,
};

export default FilterableProductTable;
