import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
const authorApiUrl = "http://localhost:5050/authors/create";

const Success = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    password: '',
    surname: '',
    dateOfBirth: '',
  });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    useEffect(() => {
      const token = new URLSearchParams(window.location.search).get('token');
    
      if (token) {
        const decodedToken = jwtDecode(token);
        const { displayName, photos } = decodedToken;
        console.log(decodedToken)
        console.log('Photos:', photos);
    
        setFormData({
          ...formData,
          name: displayName || '',
          avatar: photos && photos.length > 0 ? photos[0].value : '',
        });
      }
    }, []);


  const submitForm = async(e) =>{
      e.preventDefault();

        if (
          !formData.name ||
          !formData.surname ||
          !formData.email ||
          !formData.password ||
          !formData.dateOfBirth ||
          !formData.avatar
        ) {
          setErrorMessage('Please fill all the fields');
          return;
          }

          try {
              const postFormData = {
                  ...formData,
              };

              const response = await fetch(authorApiUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(postFormData),
              });
              console.log("Response status:", response.status);
             
              if (response.ok) {
                  console.log('sono nel if response ok')
                  setFormData({})
                  setErrorMessage('')
                  setSuccessMessage('Author succesfully created, now you can Log In!')
                  setTimeout(() => {
                    navigate('/login');
                }, 2000);
                }
          
              return response.json();
          } catch (error) {
              console.error('Failed to create Author', error)
              setErrorMessage('Errors occured')
          }
  };

  return (
    <>
    <div className={`${theme === 'dark' ? 'dark-theme' : ''}`}>
    <NavigationBar showSearch={false}></NavigationBar>
    <Container className={`fluid mt-5 d-flex justify-content-center align-items-center ${theme === 'dark' ? 'dark-theme' : ''}`} style={{marginBottom: "300px"}}>
            <Row>
            <div className="alert alert-success mt-3" role="alert">
              You logged in succesfully with GitHub, now complete your registration as Author to proceed
              </div>
                <Col className='col-md-10'>
                <Form style={{ width: '30rem'}} onSubmit={submitForm} className={`${theme === 'dark' ? 'dark-theme' : ''}`}>
                        <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Your Name" 
                            name="name" 
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput2">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Your Surname" 
                            name="surname" 
                            value={formData.surname || ''} 
                            onChange={(e) => setFormData({ ...formData, surname: e.target.value })} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Your Email" 
                            name="email" 
                            value={formData.email || ''} 
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Your Password" 
                            name="password" 
                            value={formData.password || ''} 
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="createPostForm.ControlInput5">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Your Date of Birth with YYYY/MM/DD format" 
                            name="dateOfBirth" 
                            value={formData.dateOfBirth || ''}  
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="createPostForm.ControlInput6">
                            <Form.Label>Avatar </Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Put the URL of your avatar image" 
                            name="avatar" 
                            value={formData.avatar || ''}
                            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                            />
                        </Form.Group>
                        <Button
                        type="submit"
                        variant="success"
                        >Create Author</Button>
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
                </Col>
            </Row>
        </Container>
        <Footer />
    </div>
        </>
  )
}

export default Success