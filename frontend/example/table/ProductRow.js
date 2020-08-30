import React from 'react';
import PropTypes from 'prop-types';

class ProductRow extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  getName() {
    const { product } = this.props;
    const { name, stocked } = product;
    if (stocked) {
      return name;
    }

    return <span style={{ color: 'red' }}>{name}</span>;
  }

  render() {
    const { product } = this.props;
    const { price } = product;
    const name = this.getName();
    return (
      <tr>
        <td>{name}</td>
        <td>{price}</td>
      </tr>
    );
  }
}

ProductRow.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    stocked: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ProductRow;
