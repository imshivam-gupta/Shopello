import React from 'react'

//^ Importing the required bootstrap components
import {Container,Row,Col} from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    Copyright &copy; Shopello
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer