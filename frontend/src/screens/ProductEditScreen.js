import axios from 'axios'

import React, { useState,useEffect } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, register, updateUser } from '../redux/actions/userActions'
import { USER_UPDATE_RESET } from '../redux/constants/userConstants'
import { listProductDetails, updateProduct } from '../redux/actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../redux/constants/productConstants'


const ProductEditScreen = () => {

    let navigate = useNavigate();
    const {id} = useParams();

    const dispatch = useDispatch();

    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [description,setDescription] = useState('')
    const [image,setImage] = useState('')
    const [brand,setBrand] = useState('')
    const [category,setCategory] = useState('')
    const [countInStock,setCountInStock] = useState('')

    const [uploading,setUploading] = useState(false)

    const productDetails = useSelector(state=> state.productDetails)
    const {loading,product,error} = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = productUpdate


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } 

        else if (!product || !product.name || product._id !== id)  dispatch(listProductDetails(id))

        else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    },[dispatch,product,id,successUpdate,navigate])


    const submitHandler = (e) => {
        e.preventDefault()
        console.log({
            _id: id,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        });
        dispatch(

            updateProduct(
                {
                    _id: id,
                    name,
                    price,
                    image,
                    brand,
                    category,
                    description,
                    countInStock
                }
            )
        )
    }

    const uploadFileHandler = async(e) => {

      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image',file)
      setUploading(true)

      try {
        
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }

        var { data } = await axios.post('http://localhost:4000/api/uploads', formData, config)
        
        data = (data.substr(8))
        data = 'http://localhost:4000/' +data;

        // console.log(data)
        

        setImage(data)
        setUploading(false)

      } catch (error) {
        console.error(error)
        setUploading(false)
      }

    }



    return (
        <>
            <Link to={'/admin/productlist'}> Go Back </Link>

        <FormContainer>
                <h1>Edit Product </h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:
                (
                    <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <br />
        
                    <Form.Group controlId='price'>
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='Enter price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <br />
        
                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter image url'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      ></Form.Control>

                      <Form.Control
                          type='file'
                          id='image-file'
                          label='Choose File'
                          onChange={uploadFileHandler}
                      ></Form.Control>
                      
                      {/* </Form.File> */}

                    </Form.Group>

                    <br />
        
                    <Form.Group controlId='brand'>
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <br />
        
                    <Form.Group controlId='countInStock'>
                      <Form.Label>Count In Stock</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='Enter Count In Stock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <br />
        
                    <Form.Group controlId='category'>
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <br />
        
                    <Form.Group controlId='description'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <br />

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                    </Form>
                )
                }

  

        </FormContainer>


        </>    
    )
}

export default ProductEditScreen