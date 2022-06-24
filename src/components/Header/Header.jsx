import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { DataProvider } from "../../Context/DataProvider";

function Header() {
  const { setSearchData } = useContext(DataProvider);
  return (
    <>
      <Navbar bg="primary" expand="lg" className="mb-3" fixed="top">
        <Container>
          <Navbar.Brand href="#">Al-Quran</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/player">Player</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Enter Surah Name"
                className="rounded-pill"
                style={{ width: "400px" }}
                aria-label="Search"
                onChange={(e) => {
                  setSearchData(e.target.value);
                }}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
