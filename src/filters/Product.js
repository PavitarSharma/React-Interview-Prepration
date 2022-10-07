import React from 'react'

const Product = ({products}) => {
  return (
    <div className="products">
        {
            products.map(product => (
                <div key={product.id} className="product">
                    <img src={product.image} alt={product.title} />
                    <div className="product-body">
                        <p className='product-title'>{product.title}</p>
                        <p className="product-price">{product.price}</p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Product