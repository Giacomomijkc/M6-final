import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useRef } from 'react';
import DeletePostButton from './DeletePostButton';
import { useTheme } from '../components/ThemeContext';
const apiUrl = "http://localhost:5050/posts/";

const EditPostModal = ({postId, authorId, handleIdPostToEdit, refreshPosts}) => {

    const { theme, toggleTheme } = useTheme();
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null);
    const coverInputRef = useRef(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showEditPostModal, setShowEditPostModal] = useState(true);

    const handleCloseEditPostModal = () => {
        setShowEditPostModal(false);
        handleIdPostToEdit(null);
    };

    const handleFileChange = (e) => {
        //quando facciamo upload di un input di tipo file il file si trova sempre all'array 0 della proprietà file
        setFile(e.target.files[0]);
    }



    //gestione dell'upload del file
    const uploadFile = async(image) => {
        const fileData = new FormData();
        fileData.append('cover', image);

        try {
            const response = await fetch(`${apiUrl}${postId}/updateImg`, {
                method: "PATCH",
                body: fileData,
            });
            return await response.json()
        } catch (error) {
            console.error('File upload errors occured');
        }

    };

    //scrivo la funzione collegata al button submit che lancia la fetch e richiama la funzione per svuotare 
    //i campi
    const submitForm = async(e) =>{
        e.preventDefault();

        const token = JSON.parse(localStorage.getItem("userLoggedIn"));

        if(file){
            try {
                const uploadedFile = await uploadFile(file);
                const postFormData = {
                    ...formData,
                    cover: uploadedFile.cover,
                };

                const response = await fetch(`${apiUrl}${postId}`, {
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
                    setSuccessMessage('Post succesfully edited!')
                    refreshPosts()
                  }
            
                return response.json();
            } catch (error) {
                console.error('Failed to edit Post', error)
                setErrorMessage('Errors occured')
            }
        } else {
            try {
                const response = await fetch(`http://localhost:5050/posts/${postId}`, {
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
                    setSuccessMessage('Post succesfully edited!')
                    refreshPosts()
                  }
            
                return response.json();
                
            } catch (error) {
                console.error('Failed to edit Post', error)
                setErrorMessage('Errors occured')
            }
        }
    };

    const handleReadTimeChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            readTime: {
                ...formData.readTime,
                [name]: value,
            },
        });
    };

    // Array delle categorie per il menu a tendina
    const categories = [
        "Frontend",
        "Backend",
        "React",
        "Javascript",
        "Html",
        "CSS"
    ];


  return (
    <div
    className="modal modal-container"
    style={{ display: 'block', position: 'initial' }}
  >
    <Modal centered show={showEditPostModal} onHide={handleCloseEditPostModal}>
      <Modal.Header className={` ${theme === 'dark' ? 'dark-theme' : ''}`}>
        <Modal.Title>Edit Article's data</Modal.Title>
      </Modal.Header>

      <Modal.Body className={` ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <Form style={{ width: '30rem'}} encType='multipart/form-data' onSubmit={submitForm} className={` ${theme === 'dark' ? 'dark-theme' : ''}`}>
            <Form.Group className="mb-3" controlId="createPostForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Your Title" 
                name="title" 
                value={formData.title || ''}
                onChange={(e) => setFormData({
                    ...formData,
                    title: e.target.value
                })} 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="createPostForm.ControlInput2">
                <Form.Label>Cover</Form.Label>
                <Form.Control 
                type="file" 
                placeholder="Put your cover URL" 
                name="cover" 
                ref={coverInputRef}
                onChange={handleFileChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="createPostForm.ControlTextarea1">
                <Form.Label>Content Area</Form.Label>
                <Form.Control 
                as="textarea" 
                rows={3} 
                name="content" 
                value={formData.content || ''}
                onChange={(e) => setFormData({
                    ...formData,
                    content: e.target.value
                })}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    name="value"
                    value={formData.readTime?.value || ''}
                    placeholder="valore"
                    onChange={handleReadTimeChange}
                />
                <Form.Control
                    as="select"
                    name="unit"
                    value={formData.readTime?.unit || 'minutes'}
                    onChange={handleReadTimeChange}
                >
                    <option value="minutes">minutes</option>
                    <option value="hours">hours</option>
                    <option value="days">days</option>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="createPostForm.ControlInput6">
            <Form.Label>Category </Form.Label>
                <Form.Select
                    name="category"
                    value={formData.category || 'Select a category'}
                    onChange={(e) => setFormData({
                        ...formData,
                        category: e.target.value
                    })}
                >
                <option value="">Select a category</option>
                    {categories.map((categoryOption) => (
                <option key={categoryOption} value={categoryOption}>
                {categoryOption}
                </option>
                ))}
                 </Form.Select>
            </Form.Group>
            <Button
            type="submit"
            variant="success"
            >Edit Post</Button>
            <DeletePostButton refreshPosts={refreshPosts} authorId={authorId} postId={postId}>Delete Post</DeletePostButton>
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
        <Button variant="secondary" onClick={handleCloseEditPostModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  </div>
  )
}

export default EditPostModal