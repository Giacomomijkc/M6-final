import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import logoImage from '../assets/logo.png';
import { useTheme } from './ThemeContext';
import './NavigationBar.css';

const NavigationBar = ({query, setQuery, showSearch, userData, fetchUserDataAndPostDetails}) => {

  const { toggleTheme, theme } = useTheme();
  const themeButtonText = theme === 'dark' ? 'Light Mode' : 'Dark Mode'; 
  const textColorClass = theme === 'dark' ? 'yellow' : 'violet';

  const handleToggleTheme = () => {
    toggleTheme();
    console.log('Theme toggled:', theme); // Aggiungi questa riga
  };

  useEffect(() => {
    if (fetchUserDataAndPostDetails) {
      fetchUserDataAndPostDetails();
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("userLoggedIn");
    // Inoltre, dopo il logout, esegui un reindirizzamento alla pagina di login
    window.location.href = "/";
  }


  const isUserLoggedIn = localStorage.getItem("userLoggedIn"); 

    return(
        <Navbar expand="lg" className={`sticky bg-body-tertiary ${theme === 'dark' ? 'dark-theme' : ''}`} variant="light">
        <Container className="fluid">
          <Link to={"/"}>
            <Navbar.Brand ><img src={logoImage} alt="Logo" className="logo"/></Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Button className="mx-2 button" variant="info" onClick={handleToggleTheme}>
              {themeButtonText}
            </Button>
            {showSearch && (
              <Form className="d-flex mx-2">
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
              <Button className="mx-2 button">All Authors</Button>
            </Link>
            {isUserLoggedIn ? (
            <>
              <Link to={"/create-post"}>
                <Button className="mx-2 button">Create Post</Button>
              </Link>
              <Link to={"/dashboard"}>
                <Button className="mx-2 button">Dashboard</Button>
              </Link>
              <Button className="mx-2 button" onClick={handleLogOut}>Log Out</Button>
              {userData && (
                      <div className="user ms-auto d-flex align-items-center">
                      <div className="user user-profile">
                        <span>Hi, <span className={textColorClass}>{userData.name}</span></span>
                        {userData.avatar && (
                          <img src={userData.avatar} alt="User Avatar" className="avatar mx-2" />
                        )}
                      </div>
                    </div>
                        )}
            </>
          ) : (
            <>
            <Link to={"/login"}>
              <Button className="mx-2 button">Log In</Button>
            </Link>
            </>
          )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}


export default NavigationBar;