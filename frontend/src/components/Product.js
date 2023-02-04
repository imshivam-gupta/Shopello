import React from 'react'

//^ Imporitng the neccesary features of libraries
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

//^ Importing the components required
import Rating from './Rating'

const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded product-card' >

        <Link to={`/product/${product._id}`}>
            <Card.Img  className='prod-img' src={product.image} variant='top' alt='...'  />
        </Link>

        <Card.Body>

            <Link to={'/product/'+(product._id)}>
                <Card.Title as="div">
                    <b>{product.name}</b>
                </Card.Title>
            </Link>

            <Card.Text as="div">
                <Rating 
                    value={product.rating}
                    text={product.numReviews + ' reviews'}
                />
            </Card.Text>
            
            <Card.Text as="h3">${product.price}</Card.Text>

        </Card.Body>


    </Card>
  )
}

export default Product