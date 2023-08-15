import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useRef } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useTheme } from '../components/ThemeContext';
const apiUrl = "http://localhost:5050/posts/create";
const apiUrlFile = "http://localhost:5050/posts/uploadImg"

const CreatePostInput = ({getPosts, getAuthors, getComments}) => {

    const { theme, toggleTheme } = useTheme();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null);
    const coverInputRef = useRef(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const isUserLoggedIn = localStorage.getItem("userLoggedIn"); 
  
    let decodedToken = null;

    if (isUserLoggedIn) {
        decodedToken = jwt_decode(isUserLoggedIn);
    } 

    const handleFileChange = (e) => {
        //quando facciamo upload di un input di tipo file il file si trova sempre all'array 0 della proprietà file
        setFile(e.target.files[0]);
    }



    //gestione dell'upload del file
    const uploadFile = async(image) => {
        const fileData = new FormData();
        fileData.append('cover', image);

        try {
            const response = await fetch(apiUrlFile, {
                method: "POST",
                body: fileData,
            });
            return await response.json()
        } catch (error) {
            console.error('File upload errors occured', error);
        }

    };

    //scrivo la funzione collegata al button submit che lancia la fetch e richiama la funzione per svuotare 
    //i campi
    const submitForm = async(e) =>{
        e.preventDefault();

        const token = JSON.parse(localStorage.getItem("userLoggedIn"));

        if(file && formData){
            try {
                const uploadedFile = await uploadFile(file);
                const postFormData = {
                    ...formData,
                    cover: uploadedFile.cover, author: decodedToken._id,
                };

                const response = await fetch(apiUrl, {
                    method: "POST",
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
                    setErrorMessage('')
                    setSuccessMessage('Post succesfully cretaed!')
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                  }
            
                return response.json();
            } catch (error) {
                console.error('Failed to save Post', error)
                setErrorMessage('Errors occured')
            }
        } else {
            console.error('Please fill al the fields')
            setErrorMessage('Please fill al the fields')
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
   
<Container className='fluid mt-5 d-flex justify-content-center align-items-center'>
<Row >
    <Col className={` col-md-10 ${theme === 'dark' ? 'dark-theme' : ''}`}>
        <Form style={{ width: '30rem'}} encType='multipart/form-data' onSubmit={submitForm} className={`mb-5 ${theme === 'dark' ? 'dark-theme' : ''}`}>
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
            >Create Post</Button>
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
    );
}

export default CreatePostInput;