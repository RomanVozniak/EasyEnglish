import React, { ReactRouterDOM } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Layout(props) {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">EasyEnglish</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/cards">Колоди</Nav.Link>
          <Nav.Link href="/words">Слова</Nav.Link>
          <Nav.Link href="/flashCards">Навчання</Nav.Link>
          {/* <Nav.Link href="/studyGame">Study Games</Nav.Link>
          <Nav.Link href="/testpage">Test page</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}
