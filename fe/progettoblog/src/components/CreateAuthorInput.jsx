import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useRef } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Modal from 'react-bootstrap/Modal';
import { useTheme } from '../components/ThemeContext';
const authorApiUrl = "http://localhost:5050/authors/create";
const apiUrlFile = "http://localhost:5050/authors/uploadImg"

const CreateAuthorInput = ({handleCloseCreateAuthorInput, showCreateAuthorInput}) => {

    const { theme } = useTheme();

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
            const response = await fetch(apiUrlFile, {
                method: "POST",
                body: fileData,
            });
            return await response.json()
        } catch (error) {
            console.error('File upload errors occured');
        }
    };

    const submitForm = async(e) =>{
        e.preventDefault();

        if(file && formData){
            try {
                const uploadedFile = await uploadFile(file);
                const postFormData = {
                    ...formData,
                    avatar: uploadedFile.avatar,
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
                    setFile('Nessun file selezionato')
                    coverInputRef.current.value = null;
                    setErrorMessage('')
                    setSuccessMessage('Author succesfully created!')
                  }
            
                return response.json();
            } catch (error) {
                console.error('Failed to save Author', error)
                setErrorMessage('Errors occured')
            }
        } else {
            console.error('Please fill al the fields')
            setErrorMessage('Please fill al the fields')
        }
    };


    return (
        <Container className={`fluid mt-5 d-flex justify-content-center align-items-center ${theme === 'dark' ? 'dark-theme' : ''}`}>
            <Row>
                <Col className='col-md-10'>
                <Modal  show={showCreateAuthorInput} onHide={handleCloseCreateAuthorInput}>
                    <Modal.Header className={`${theme === 'dark' ? 'dark-theme' : ''}`}>
                            <Modal.Title>Create Your Comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={`${theme === 'dark' ? 'dark-theme' : ''}`}>
                        <Form style={{ width: '30rem'}} encType='multipart/form-data' onSubmit={submitForm} className={`${theme === 'dark' ? 'dark-theme' : ''}`}>
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
                    </Modal.Body>
                    <Modal.Footer className={`${theme === 'dark' ? 'dark-theme' : ''}`}>
                        <Button variant="secondary" onClick={handleCloseCreateAuthorInput}>
                                Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                </Col>
            </Row>
        </Container>
    );

}

export default CreateAuthorInput;