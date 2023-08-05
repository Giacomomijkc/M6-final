import React from 'react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { Link } from 'react-router-dom';


const AllAuthorPosts = ({query, setQuery}) => {

    const {authorId} = useParams();
    const [posts, setPosts] = useState([]);
    const [authorDetails, setAuthorDetails] = useState({});



    useEffect(() =>{
        const fetchAuthorPosts = async() =>{
            try {
                const data = await fetch (`http://localhost:5050/authors/${authorId}/posts`);
                const response = await data.json();
                setPosts(response.findPost);
                console.log(response);
                console.log(posts)
                
            } catch (error) {
                console.error('Error occurred during fetching user data:', error);
            }
        };

        fetchAuthorPosts();
        }, [authorId])
    
    useEffect(() =>{
        const fetchAuthorDetails = async() =>{
            try {
                const data = await fetch (`http://localhost:5050/authors/${authorId}`);
                const response = await data.json();
                setAuthorDetails(response.authorById);
                    
            } catch (error) {
                console.error('Error occurred during fetching user data:', error);
            }
        };
    
        fetchAuthorDetails();
        }, [authorId])

    if (!posts || !posts.length) {
        // Mostra un messaggio di caricamento o gestisci il caso in cui i dati non siano ancora disponibili
        return <div className='alert alert-info mt-5' role='alert'>Loading...</div>;
    }

    const filteredPosts = posts && posts.filter((filteredPost) => 
        filteredPost.title.toLowerCase().includes(query?.toLowerCase() || ""))
    
    const MAX_CONTENT_LENGTH = 100

  return (
    <>
    <NavigationBar showSearch={true} query={query} setQuery={setQuery}/>
    <Container className="fluid my-5 justify-content-center">
        <Row>
            <Col className="col-md-12">
                <div className='d-flex justify-content-center gap-1 flex-wrap my-5'>
                    <h1 className='mx-2'>All <span className='violet'>{authorDetails.name}</span>'s articles</h1>
                </div>
            </Col>
        </Row>
    </Container>
    <Container className="fluid my-5 justify-content-center">
            <Row>
                <Col className="col-md-12">
                    <div className='d-flex justify-content-center gap-2 flex-wrap'>
                    {!query ? (
                        posts.map((post) => (
                            <Card style={{ width: '20rem' }} key={post._id} className='my-3'>
                                <Card.Img variant='top' className="fluid cover" src={post.cover} alt="Cover" />
                                <CardHeader>
                                    <Card.Title>{post.title}</Card.Title>
                                </CardHeader> 
                                <Card.Body>
                                    <Card.Text className='post-info-text my-0'>Category: {post.category}</Card.Text>
                                    <Card.Text className='post-info-text my-0'>Read Time: {post.readTime.value} {post.readTime.unit}</Card.Text>
                                    <Card.Text className='post-content my-2'>{post.content.length > MAX_CONTENT_LENGTH ? post.content.slice(0, MAX_CONTENT_LENGTH) + '...' : post.content}</Card.Text>
                                    <footer className='d-flex gap-2 mt-2'>
                                        <Link to={`/posts/${post._id}`} >
                                            <Button variant="success" className='mt-1 article-buttons' >Read article</Button>
                                        </Link>
                                    </footer>
                                </Card.Body>
                            </Card>
                        ))
                        ) : (
                        filteredPosts.map((filteredPost) => (
                            <Card style={{ width: '20rem' }} key={filteredPost._id} className='my-3'>
                                <Card.Img variant='top' className="fluid cover" src={filteredPost.cover} alt="Cover" />
                                <CardHeader>
                                    <Card.Title>{filteredPost.title}</Card.Title>
                                </CardHeader> 
                                <Card.Body>
                                    <Card.Text className='post-info-text my-0'>Category: {filteredPost.category}</Card.Text>
                                    <Card.Text className='post-info-text my-0'>Read Time: {filteredPost.readTime.value} {filteredPost.readTime.unit}</Card.Text>
                                    <Card.Text className='post-content my-2'>{filteredPost.content.length > MAX_CONTENT_LENGTH ? filteredPost.content.slice(0, MAX_CONTENT_LENGTH) + '...' : filteredPost.content}</Card.Text>
                                    <footer className='d-flex gap-2 mt-2'>
                                        <Link to={`/posts/${filteredPost._id}`} >
                                            <Button variant="success" className='mt-1 article-buttons' >Read article</Button>
                                        </Link>
                                    </footer>
                                </Card.Body>
                            </Card>
                        ))
                    )}
                    </div>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </>
  )
}


export default AllAuthorPosts




