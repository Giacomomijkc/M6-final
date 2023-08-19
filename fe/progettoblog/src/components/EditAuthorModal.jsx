import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DeleteAuthorButton from './DeleteAuthorButton';
import { useState, useRef } from 'react';
import { useTheme } from '../components/ThemeContext';
const apiUrl = "http://localhost:5050/authors/";

const EditAuthorModal = ({authorId, showEditAuthorModal, handleCloseEditAuthorModal, refreshAuthor, authorPosts}) => {

    const { theme, toggleTheme } = useTheme();
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null);
    const coverInputRef = useRef(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleFileChange = (e) => {
        //quando facciamo upload di un input di tipo file il file si trova sempre all'array 0 della proprietà file
        setFile(e.target.files[0]);
    }

        //gestione dell'upload del file
    const uploadFile = async(image) => {
        const fileData = new FormData();
        fileData.append('avatar', image);
    
        try {
            const response = await fetch(`${apiUrl}${authorId}/cloudUpdateImg`, {
                method: "PATCH",
                body: fileData,
            });
            return await response.json()
        } catch (error) {
            console.error('File upload errors occured');
        }
    };

    const submitForm = async(e) =>{
        e.preventDefault();

        const token = JSON.parse(localStorage.getItem("userLoggedIn"));

        if(file){
            try {
                const uploadedFile = await uploadFile(file);
                const postFormData = {
                    ...formData,
                    avatar: uploadedFile.avatar,
                };

                const response = await fetch(`${apiUrl}${authorId}`, {
                    method: "PATCH",
                    headers: {
						"Content-Type": "application/json",
                        "Authorization": token
					},
                    body: JSON.stringify(postFormData),
                });
                console.log("Response status:", response.status);
               
                if (response.ok) {
                    console.log('sono nel if response ok')
                    setFormData({})
                    setFile('Nessun file selezionato')
                    coverInputRef.current.value = null;
                    setSuccessMessage('Author succesfully edited!')
                    refreshAuthor()
                  }
            
                return response.json();
            } catch (error) {
                console.error('Failed to edit Author', error)
                setErrorMessage('Errors occured')
            }
        } else {
            try {
                const response = await fetch(`${apiUrl}${authorId}`, {
                    method: "PATCH",
                    headers: {
						"Content-Type": "application/json",
                        "Authorization": token
					},
                    body: JSON.stringify(formData),
                });
                console.log("Response status:", response.status);
               
                if (response.ok) {
                    console.log('sono nel if response ok')
                    setFormData({})
                    setFile('Nessun file selezionato')
                    coverInputRef.current.value = null;
                    setSuccessMessage('Author succesfully edited!')
                    refreshAuthor()
                  }
            
                return response.json();
            } catch (error) {
                console.error('Failed to edit Post', error)
                setErrorMessage('Errors occured')
            }
        }
    };
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={showEditAuthorModal} onHide={handleCloseEditAuthorModal}>
        <Modal.Header className={` ${theme === 'dark' ? 'dark-theme' : ''}`}>
          <Modal.Title>Edit Author's Data</Modal.Title>
        </Modal.Header>

        <Modal.Body className={` ${theme === 'dark' ? 'dark-theme' : ''}`}>
        <Form style={{ width: '30rem'}} encType='multipart/form-data' onSubmit={submitForm} className={` ${theme === 'dark' ? 'dark-theme' : ''}`}>
                        <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Your Name" 
                            name="name" 
                            value={formData.name || ''} 
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
                            type="file" 
                            placeholder="Put the URL of your avatar image" 
                            name="avatar" 
                            ref={coverInputRef}
                            onChange={handleFileChange}
                            />
                        </Form.Group>
                        <Button
                        type="submit"
                        variant="success"
                        >Edit Author</Button>
                        <DeleteAuthorButton authorId={authorId} authorPosts={authorPosts}  />
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
        </Modal.Body>

        <Modal.Footer className={` ${theme === 'dark' ? 'dark-theme' : ''}`}>
          <Button variant="secondary" onClick={handleCloseEditAuthorModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditAuthorModal