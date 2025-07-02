import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return React.createElement('p', null, 'Product not found');
  }

  return React.createElement(
    'div',
    null,
    [
      React.createElement('img', {
        src: product.image,
        alt: product.name,
        key: 'img'
      }),
      React.createElement('h2', { key: 'name' }, product.name),
      React.createElement('p', { key: 'price' }, `$${product.price}`),
      React.createElement('p', { key: 'desc' }, product.description),
      React.createElement('button', { key: 'btn' }, 'Add to Cart')
    ]
  );
}

export default ProductDetail;
