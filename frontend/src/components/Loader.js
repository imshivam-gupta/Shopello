import React from 'react'
import {Spinner} from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner animation="border" role="status"
        style={{
            width: '30px',
            height: '30px',
            margin: 'auto',
            marginTop: '20%',
            display: 'block'
        }}
    >

    </Spinner>
  )
}

export default Loader