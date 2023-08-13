import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import jwt_decode from "jwt-decode";
import { useTheme } from '../components/ThemeContext';
const apiUrl = 'http://localhost:5050/comments/create';

const MakeCommentModal = ({postId, show, setShow, handleRefreshPostComments}) => {

    const { theme, toggleTheme } = useTheme();
    const [commentFormData, setCommentFormData] = useState ({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const isUserLoggedIn = localStorage.getItem("userLoggedIn"); 

    let decodedToken = null;

    if (isUserLoggedIn) {
        decodedToken = jwt_decode(isUserLoggedIn);
    } 

    const handleClose = () => {
        setShow(false);
        setSuccessMessage('');
        setErrorMessage('');
    }


    const submitNewComment = async(e) => {
        e.preventDefault();

        const token = JSON.parse(localStorage.getItem("userLoggedIn"));

        try {
            const newComment = {...commentFormData, post: postId, author: decodedToken._id}
            const response = await fetch(`${apiUrl}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(newComment),
            });
            if (response.ok) {
                console.log('sono nel if response ok')
                setCommentFormData({})
                setTimeout(() => {
                    setSuccessMessage('Comment succesfully posted!');
                }, 2000);
                handleRefreshPostComments()
              }

              return response.json();
        } catch (error) {
            console.error('Failed to save Post', error)
            setTimeout(() => {
                setErrorMessage('Errors occured');
            }, 2000);
        }
    
    }
  return (
    <Modal show={show} onHide={handleClose}>
                                <Modal.Header className={` ${theme === 'dark' ? 'dark-theme' : ''}`}>
                                    <Modal.Title>Create Your Comment</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className={` ${theme === 'dark' ? 'dark-theme' : ''}`}>
                                    <Form style={{ width: '30rem'}} onSubmit={submitNewComment} className={` ${theme === 'dark' ? 'dark-theme' : ''}`}>
                                        <Form.Group className="mb-3" controlId="createPostForm.ControlInput1">
                                            <Form.Label>Rate</Form.Label>
                                            <Form.Control 
                                            type="number" 
                                            placeholder="Your Rate" 
                                            name="rate" 
                                            value={commentFormData.rate || ''}
                                            onChange={(e) => setCommentFormData({
                                            ...commentFormData,
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
                                            value={commentFormData.content || ''}
                                            onChange={(e) => setCommentFormData({
                                            ...commentFormData,
                                            content: e.target.value
                                            })}
                                            />
                                        </Form.Group>
                                        <Button
                                        type="submit"
                                        variant="success"
                                        >Create Comment</Button>
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
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
  )
}

export default MakeCommentModal