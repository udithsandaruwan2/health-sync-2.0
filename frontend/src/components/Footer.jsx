import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer
      style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        backgroundColor: '#f8f9fa', // Optional background for visibility
        textAlign: 'center',
        padding: '10px 0',
      }}
    >
      <Container>
        <Row>
          <Col>
            Copyright &copy; Health Sync 2.0
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
