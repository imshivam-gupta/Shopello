import React, { useEffect } from 'react'
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listTopProducts } from '../redux/actions/productActions';
import { productCreateReducer } from '../redux/reducers/productReducers';
import Loader from './Loader';
import Message from './Message';
import Carousel from 'react-bootstrap/Carousel';

const ProductCarousel = () => {
    const dispatch = useDispatch();

    const productTopRated = useSelector(state=> state.productTopRated)
    const {loading,error,products} = productTopRated

    useEffect(()=>{
        dispatch(listTopProducts())
    },[dispatch])

  return <>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        (
            <Carousel fade pause='hover' className='bg-dark'>
                {
                    products.map(product => (
                        <Carousel.Item key={product._id} interval={1500}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid />
                                <Carousel.Caption className='carousel-caption'>
                                    <h2>{product.name}</h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))
                }
            </Carousel>
        )
  }
  </>
}

export default ProductCarousel