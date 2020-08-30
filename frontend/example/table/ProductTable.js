import React from 'react';
import PropTypes from 'prop-types';
import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  buildRows() {
    const { products, filterText, inStockOnly } = this.props;

    let rows = [];
    let lastCategory = null;

    products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        const productCategoryRow = (
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
        rows = [...rows, productCategoryRow];
      }
      const productRow = <ProductRow product={product} key={product.name} />;
      rows = [...rows, productRow];
      lastCategory = product.category;
    });

    return rows;
  }

  render() {
    const rows = this.buildRows();
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Test</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

const product = PropTypes.shape({
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  stocked: PropTypes.bool.isRequired,
}).isRequired;

ProductTable.propTypes = {
  products: PropTypes.arrayOf(product).isRequired,
  filterText: PropTypes.string.isRequired,
  inStockOnly: PropTypes.bool.isRequired,
};

export default ProductTable;
