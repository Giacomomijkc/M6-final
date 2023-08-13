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
import { useTheme } from '../components/ThemeContext';
const apiUrlPosts = 'http://localhost:5050/posts';


const Dashboard = ({userData, postDetails, setPostDetails, fetchUserDataAndPostDetails}) => {

      const { theme, toggleTheme } = useTheme();
      const MAX_CONTENT_LENGTH = 100
      const textColorClass = theme === 'dark' ? 'yellow' : 'violet';

      const [showEditAuthorModal, setShowEditAuthorModal] = useState(false);
      const [postIdToEdit, setPostIdToEdit] = useState(null);


      const handleShowEditAuthorModal = () => {
        setShowEditAuthorModal(true);
      };

      const handleCloseEditAuthorModal = () => {
        setShowEditAuthorModal(false);
      }

      const isIdPostToEdit = (postId) => {
        return postIdToEdit !== null && postIdToEdit === postId;
      };


      const handleIdPostToEdit = (postId) => {
        setPostIdToEdit(postId);
      };
    
      useEffect(() => {        
        fetchUserDataAndPostDetails();
      }, []);

      const handleRefreshPostsAndAuthors = () =>{
        fetchUserDataAndPostDetails();
      }
    
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
          <Card style={{ width: '20rem' }} className={`my-3 ${theme === 'dark' ? 'dark-theme' : ''}`}>
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
              <Button variant="warning" className='mt-1 article-buttons' onClick={() => handleIdPostToEdit(post.postById._id)} key={"button" + renderIndex} id={"button" + renderIndex} >Edit article</Button>
            </footer>
            </Card.Body>
          </Card>
          <div className='ps-4'>
            {isIdPostToEdit(post.postById._id) && 
            <EditPostModal 
            handleIdPostToEdit={handleIdPostToEdit}
            postId={post.postById._id} 
            authorId={userData._id} 
            setPostDetails={setPostDetails}
            refreshPosts={handleRefreshPostsAndAuthors}
            />}
          </div>
        </div>
        ));
      };
    
      return (
        <>
         <div className={`${theme === 'dark' ? 'dark-theme' : ''}`}>
         <NavigationBar showSearch={false} userData={userData} fetchUserDataAndPostDetails={fetchUserDataAndPostDetails}/>
        <Container className={`fluid justify-content-center ${theme === 'dark' ? 'dark-theme' : ''}`}>
          <Row >
            <Col className='col-md-12'>
            <div className='d-flex justify-content-center align-items-center gap-5'>
              <div className='d-flex flex-column' >
                <h1 >Welcome</h1>
                <h1 className={textColorClass} >{userData.name}</h1>
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
            authorPosts = {userData.posts}
            showEditAuthorModal={showEditAuthorModal} 
            handleCloseEditAuthorModal={handleCloseEditAuthorModal} 
            authorId={userData._id} 
            refreshAuthor={handleRefreshPostsAndAuthors}
            />}
          </div>
            </Col>
          </Row>
        </Container>
        <Container className={`fluid my-5 justify-content-center ${theme === 'dark' ? 'dark-theme' : ''}`}>
          <Row>
            <Col className="col-md-12">
              <div className='d-flex justify-content-center gap-1 flex-wrap my-5'>
                <h1 className='mx-2'>You wrote <span className={textColorClass}>{userData.posts.length}</span> articles</h1>
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
         </div>
        </>
      );
    };

export default Dashboard