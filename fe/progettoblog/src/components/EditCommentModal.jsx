import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DeleteCommentButton from './DeleteCommentButton';
import { useState } from 'react';
import { useTheme } from '../components/ThemeContext';


const EditCommentModal = ({commentId, handleIdCommentToEdit, handleRefreshPostComments }) => {

    const { theme, toggleTheme } = useTheme();
    const [commentEditFormData, setCommentEditFormData] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showCommentModal, setShowCommentModal] = useState(true);

    const [successDeleteMessage, setSuccessDeleteMessage] = useState('');
    const [errorDeleteMessage, setErrorDeleteMessage] = useState('');

    const handleCloseEditCommentModal = () => {
        setShowCommentModal(false);
        handleIdCommentToEdit(null);
    };

    const submitEditedComment = async(e) =>{
        e.preventDefault();

        const token = JSON.parse(localStorage.getItem("userLoggedIn"));

        try {
            const response = await fetch(`http://localhost:5050/comments/update/${commentId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(commentEditFormData),
            });
            console.log("Response status:", response.status);
            console.log(token)
            console.log(token._id)
           
            if (response.ok) {
                console.log('sono nel if response ok')
                setCommentEditFormData({})
                setErrorMessage('')
                setTimeout(() => {
                    setSuccessMessage('Comment succesfully edited!');
                }, 2000);
                handleRefreshPostComments();
              } else {
                const errorData = await response.json(); // Extract the error message
                setErrorMessage(errorData.message);
              }
            
        } catch (error) {
            console.error('Failed to edit Comment', error)
            setErrorMessage('Errors occured')
        }
    }

  return (
    <Modal show={showCommentModal} onHide={handleCloseEditCommentModal}  >
                                    <Modal.Header  className={` ${theme === 'dark' ? 'dark-theme' : ''}`}>
                                        <Modal.Title>Edit Your Comment</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className={` ${theme === 'dark' ? 'dark-theme' : ''}`}>
                                        <Form style={{ width: '30rem'}} onSubmit={submitEditedComment} className={` ${theme === 'dark' ? 'dark-theme' : ''}`}>
                                            <Form.Group className="mb-3" controlId="createPostForm.ControlInput1">
                                                <Form.Label>Rate</Form.Label>
                                                <Form.Control 
                                                type="number" 
                                                placeholder="Your Rate" 
                                                name="rate" 
                                                value={commentEditFormData.rate || ''}
                                                onChange={(e) => setCommentEditFormData({
                                                ...commentEditFormData,
                                                rate: e.target.value
                                                })} 
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="createPostForm.ControlTextarea1">
                                                <Form.Label>Content</Form.Label>
                                                <Form.Control 
                                                as="textarea" 
                                                rows={3} 
                                                name="content" 
                                                value={commentEditFormData.content || ''}
                                                onChange={(e) => setCommentEditFormData({
                                                ...commentEditFormData,
                                                content: e.target.value
                                                })}
                                                />
                                            </Form.Group>
                                            <Button
                                            type="submit"
                                            variant="success"
                                            >Edit Comment</Button>
                                            <DeleteCommentButton commentId={commentId} handleRefreshPostComments={handleRefreshPostComments} setErrorDeleteMessage={setErrorDeleteMessage} setSuccessDeleteMessage={setSuccessDeleteMessage} />
                                        </Form>
                                        {successDeleteMessage && (
                                            <div className="alert alert-success mt-3" role="alert">
                                                {successDeleteMessage}
                                            </div>
                                        )}
                                        {errorDeleteMessage && (
                                            <div className="alert alert-danger mt-3" role="alert">
                                                {errorDeleteMessage}
                                            </div>
                                        )}
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
                                        <Button variant="secondary" onClick={handleCloseEditCommentModal}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
  )
}

export default EditCommentModal