import React, { ReactRouterDOM } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Layout(props) {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">EasyEnglish</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/cards">Cards</Nav.Link>
          <Nav.Link href="/testpage">Test page</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
