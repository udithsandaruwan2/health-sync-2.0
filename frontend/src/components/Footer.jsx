
import { Container, Row, Col } from 'react-bootstrap';

/**
 * Footer component that renders the footer section of the application.
 * 
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 * 
 * @returns {JSX.Element} The rendered footer component.
 * 
 * @description
 * This component renders a footer with a specified style. It includes a container
 * with a row and a column that displays the copyright information.
 */
function Footer() {
  return (
    <footer
      style={{

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