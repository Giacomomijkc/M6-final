import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import './dashboard.css';
import Footer from '../components/Footer';
import EditPostModal from '../components/EditPostModal';
import EditAuthorModal from '../components/EditAuthorModal';
const apiUrlPosts = 'http://localhost:5050/posts';


const Dashboard = () => {

      const [userData, setUserData] = useState(null);
      const [postDetails, setPostDetails] = useState([]);
      const MAX_CONTENT_LENGTH = 100

      const [showEditAuthorModal, setShowEditAuthorModal] = useState(false);
      const [postIdToEdit, setPostIdToEdit] = useState(null);


      const handleShowEditAuthorModal = () => {
        setShowEditAuthorModal(true);
      };

      const isIdPostToEdit = (postId) => {
        return postIdToEdit !== null && postIdToEdit === postId;
      };


      const handleIdPostToEdit = (postId) => {
        setPostIdToEdit(postId);
      };
    
      useEffect(() => {
        // Effettua una richiesta al backend per ottenere i dati dell'utente autenticato
        const fetchUserDataAndPostDetails = async () => {
          try {
            const token = JSON.parse(localStorage.getItem("userLoggedIn"));
    
            if (!token) {
              // Il token non è presente, gestire il caso in cui l'utente non sia autenticato
              return <div className='alert alert-warning mt-5' role='alert'>Non autorizzato</div>;
            }
    
            const response = await fetch('http://localhost:5050/dashboard', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            });
    
            if (!response.ok) {
              // Gestisci il caso in cui la richiesta fallisca o l'utente non sia autorizzato
              return;
            }
    
            const data = await response.json();
            setUserData(data); // Imposta i dati dell'utente nello stato locale


            const posts = data.posts;

            if(!posts){
              return <div className='alert alert-warning mt-5' role='alert'>Non ci sono posts</div>;
            }

            const dataPosts = await Promise.all(
              posts.map(async (postId) => {
                const response = await fetch(`${apiUrlPosts}/${postId}`);
              
              if (!response.ok) {
                throw new Error('Failed to fetch post details');
              }
            
              return response.json()
              })
            );
            
            console.log('fine Post')
            setPostDetails(dataPosts)
          
            } catch (error) {
              console.error('Error occurred during fetching user data:', error);
            }
          };
        
        fetchUserDataAndPostDetails();
      }, []);

      /*const fetchUserData = async (userData, postDetails) => {
        try {
          console.log('inizio fetchUserData')
          const token = JSON.parse(localStorage.getItem("userLoggedIn"));
  
          if (!token) {
            // Il token non è presente, gestire il caso in cui l'utente non sia autenticato
            return <div className='alert alert-warning mt-5' role='alert'>Non autorizzato</div>;
          }
  
          const response = await fetch('http://localhost:5050/dashboard', {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": token
              },
          });
  
          if (!response.ok) {
            // Gestisci il caso in cui la richiesta fallisca o l'utente non sia autorizzato
            return;
          }
  
          const data = await response.json();
          setUserData(data); // Imposta i dati dell'utente nello stato locale
          console.log('fine fetchUserData')
          console.log(userData);
          await fetchDetailsPost(data, postDetails);
        } catch (error) {
          console.error('Error occurred during fetching user data:', error);
        }
      };

      const fetchDetailsPost = async(data, postDetails) =>{
        try {
          console.log('inizio Post')
          console.log(userData)
          const posts = userData.posts;

          if(!posts){
            return <div className='alert alert-warning mt-5' role='alert'>Non ci sono posts</div>;
          }

          const data = await Promise.all(
            posts.map(async (postId) => {
            const response = await fetch(`${apiUrlPosts}/${postId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch post details');
            }
            return response.json()
            })
          );
          console.log('fine Post')
          setPostDetails(data)

        } catch (error) {
          console.error('Error occurred during fetching user data:', error);
        }
    };*/

      /*useEffect(() => {
        const fetchDetailsPost = async() =>{
            try {

              const posts = userData.posts;

              if(!posts){
                return <div className='alert alert-warning mt-5' role='alert'>Non ci sono posts</div>;
              }

              const data = await Promise.all(
                posts.map(async (postId) => {
                const response = await fetch(`${apiUrlPosts}/${postId}`);
                if (!response.ok) {
                  throw new Error('Failed to fetch post details');
                }
                return response.json()
                })
              );
              
              setPostDetails(data)

            } catch (error) {
              console.error('Error occurred during fetching user data:', error);
            }
        };
        fetchDetailsPost();
      }, [userData])*/
    
      if (!userData) {
        // Mostra un messaggio di caricamento o gestisci il caso in cui i dati non siano ancora disponibili
        return <div className='alert alert-info mt-5' role='alert'>Loading...</div>;
      }

      const renderPosts = () => {
        if (!userData || !postDetails.length) {
          return null;
        }
    
        return postDetails.map((post, renderIndex) => (
        <div key={post.postById._id}>
          <Card style={{ width: '20rem' }} className='my-3'>
            <Card.Img variant='top' className="fluid cover" src={post.postById.cover} alt="Cover" />
            <CardHeader>
              <Card.Title>{post.postById.title}</Card.Title>
            </CardHeader> 
            <Card.Body>
              <Card.Text className='post-info-text my-0'>Category: {post.postById.category}</Card.Text>
              <Card.Text className='post-info-text my-0'>Read Time: {post.postById.readTime.value} {post.postById.readTime.unit}</Card.Text>
              <Card.Text className='post-content my-2'>{post.postById.content.length > MAX_CONTENT_LENGTH ? post.postById.content.slice(0, MAX_CONTENT_LENGTH) + '...' : post.postById.content}</Card.Text>
            <footer className='d-flex gap-2 mt-2'>
              <Link to={`/posts/${post.postById._id}`} >
                <Button variant="success" className='mt-1 article-buttons' >Read article</Button>
              </Link>
              <Link >
                <Button variant="warning" className='mt-1 article-buttons' onClick={() => handleIdPostToEdit(post.postById._id)} key={"button" + renderIndex} id={"button" + renderIndex} >Edit article</Button>
              </Link>
            </footer>
            </Card.Body>
          </Card>
          <div className='ps-4'>
            {isIdPostToEdit(post.postById._id) && 
            <EditPostModal 
            handleIdPostToEdit={handleIdPostToEdit}
            postId={post.postById._id} 
            />}
          </div>
        </div>
        ));
      };
    
      return (
        <>
        <NavigationBar showSearch={false}/>
        <Container className='fluid my-5 justify-content-center'>
          <Row>
            <Col className='col-md-12'>
            <div className='d-flex justify-content-center align-items-center gap-5'>
              <div className='d-flex flex-column' >
                <h1 >Welcome</h1>
                <h1 className='violet' >{userData.name}</h1>
              </div>
              <div>
                <div className='d-flex justify-content-between align-items-center gap-3 box-data'>
                  <div className='d-flex flex-column'> 
                    <span>Surname: {userData.surname}</span>
                    <span>Email: {userData.email}</span>
                    <span>Date of Birth: {userData.dateOfBirth}</span>
                    <Button variant="warning" className='mt-1 data-button' onClick={handleShowEditAuthorModal}>Edit datas</Button>
                  </div>
                  <div>
                    <img className='avatar' src={userData.avatar} />
                  </div>
                </div>
              </div>
            </div>
            <div className='ps-4'>
            {showEditAuthorModal && 
            <EditAuthorModal 
            showEditAuthorModal={showEditAuthorModal} 
            setShowEditAuthorModal={setShowEditAuthorModal} 
            authorId={userData._id} 
            />}
          </div>
            </Col>
          </Row>
        </Container>
        <Container className="fluid my-5 justify-content-center">
          <Row>
            <Col className="col-md-12">
              <div className='d-flex justify-content-center gap-1 flex-wrap my-5'>
                <h1 className='mx-2'>You wrote <span className='violet'>{userData.posts.length}</span> articles</h1>
              </div>
            </Col>
            <Col className="col-md-12">
              <div className='d-flex justify-content-center gap-2 flex-wrap'>
              {renderPosts()}
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
        </>
      );
    };

export default Dashboard