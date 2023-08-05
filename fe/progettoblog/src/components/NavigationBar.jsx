import React from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import logoImage from '../assets/logo.png';
import './NavigationBar.css';

const NavigationBar = ({query, setQuery, showSearch}) => {

  const handleLogOut = () => {
    localStorage.removeItem("userLoggedIn");
    // Inoltre, dopo il logout, esegui un reindirizzamento alla pagina di login
    window.location.href = "/";
}

  const isUserLoggedIn = localStorage.getItem("userLoggedIn");  

    return(
        <Navbar expand="lg" className="bg-body-tertiary" variant="light">
        <Container fluid>
          <Link to={"/"}>
            <Navbar.Brand href="#"><img src={logoImage} alt="Logo" className="logo"/></Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {showSearch && (
              <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Cerca un articolo"
                className="me-2"
                aria-label="Search"
                //dichiaro che il value è uguale a query
                value={query}
                //gestisco il cambio del valore di query dentro l'input
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form>
            )}
            <Link to={"/authors-page"}>
              <Button className="mx-2">See all Authors</Button>
            </Link>
            {isUserLoggedIn ? (
            <>
              <Link to={"/create-post"}>
                <Button className="mx-2">Create Post</Button>
              </Link>
              <Link to={"/dashboard"}>
                <Button className="mx-2">Dashboard</Button>
              </Link>
              <Button onClick={handleLogOut}>Log Out</Button>
            </>
          ) : (
            <>
            <Link to={"/login"}>
              <Button className="mx-2">Log In</Button>
            </Link>
            </>
          )}
           
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}


export default NavigationBar;