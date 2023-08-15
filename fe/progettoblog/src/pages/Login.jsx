import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import NavigationBar from '../components/NavigationBar';
import CreateAuthorInput from '../components/CreateAuthorInput';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import './login.css';
const apiUrlLogin = "http://localhost:5050/login"

const Login = () => {
    
    const { theme, toggleTheme } = useTheme();
    const [loginFormData, setLoginFormData] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const [showCreateAuthorInput, setShowCreateAuthorInput] = useState(false);

    const handleShowCreateAuthorInput = () => {
      setShowCreateAuthorInput(true);
    };

    const handleCloseCreateAuthorInput = () => {
      setShowCreateAuthorInput(false);
    };

    const onSubmit = async(e) =>{
        e.preventDefault();

        if(!loginFormData.email || !loginFormData.password){
          setErrorMessage('Please fill al the fields!');
          return;
        }

            try {
                const response = await fetch(apiUrlLogin, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(loginFormData),
                });

                const data = await response.json();
          
                if (response.ok) {
                localStorage.setItem("userLoggedIn", JSON.stringify(data.token));
                console.log('token salvato')
                setErrorMessage('')
                setSuccessMessage('Log In succesfully completed!')
                setTimeout(() => {
                  navigate('/dashboard');
                }, 2000);
                }

                else {
                  setErrorMessage(data.message); // Imposta il messaggio di errore dal backend
              }
          
              } catch (error) {
                console.error("Error occurred during login:", error);
                setErrorMessage('Error occurred during login!')
              }
    };

    const handleLoginGitHub =  () => {
      window.location.href = 'http://localhost:5050/auth/github'
    }

  return (
    <>
    <div className={`${theme === 'dark' ? 'dark-theme' : ''}`}>
    <NavigationBar showSearch={false}></NavigationBar>
    <Container className={`fluid mt-5 d-flex justify-content-center align-items-center ${theme === 'dark' ? 'dark-theme' : ''}`} style={{marginBottom: "300px"}}>
            <Row>
                <Col className='col-md-10'>
                    <Form style={{ width: '30rem'}} onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Your Email" 
                            name="email" 
                            onChange={(e) => setLoginFormData({
                                ...loginFormData,
                                email: e.target.value
                            })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Your Password" 
                            name="password" 
                            onChange={(e) => setLoginFormData({
                                ...loginFormData,
                                password: e.target.value
                            })}
                            />
                        </Form.Group>
                        <Button
                        type="submit"
                        variant="success"
                        >Login</Button>
                    </Form>
                    {successMessage && (
                        <div className="alert alert-success mt-3" role="alert">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <Button
                        onClick={handleLoginGitHub}
                        variant="success"
                        type="submit"
                        className="mt-2 me-1"
                        >Login con GitHub
                    </Button>
                    <Button
                      variant="info"
                      onClick={handleShowCreateAuthorInput}
                      className="mt-2 ms-1"
                    >
                     Non sei registrato?
                    </Button>
                    <div className='ps-4' >
                      {showCreateAuthorInput && <CreateAuthorInput showCreateAuthorInput={showCreateAuthorInput} handleCloseCreateAuthorInput={handleCloseCreateAuthorInput} />}
                    </div>
                </Col>
            </Row>
        </Container>
        <Footer />
    </div>
        </>
  )
}

export default Login