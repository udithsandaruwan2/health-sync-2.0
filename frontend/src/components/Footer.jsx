import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; Health Sync 2.0
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer