import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import SinglePost from './SinglePost';
import {useEffect } from 'react';
import { useTheme } from './ThemeContext';

const AllPosts = ({posts, query, authors, getPosts, getAuthors, getComments}) => {
    const { theme } = useTheme();

    useEffect(() => {
        getPosts();
      },[])

    useEffect(() => {
        getAuthors();
    },[])

    useEffect(() => {
        getComments();
      }, []);

    const filteredPosts = posts.filter((filteredPost) => 
        filteredPost.title.toLowerCase().includes(query?.toLowerCase() || ""))

        const findAuthorForPost = (postId) => {
            for (let i = 0; i < authors.length; i++) {
              const author = authors[i];
              const postIndex = author.posts.findIndex((post) => post._id === postId);
              if (postIndex !== -1) {
                return author;
              }
            }
            return null;
          };
          
              
          

    if (!posts) {
            return <div>Loading...</div>;
    }

    return(
        <div className={` ${theme === 'dark' ? 'dark-theme' : ''}`}>
            <Container className={`fluid justify-content-center ${theme === 'dark' ? 'dark-theme' : ''}`}>
            <Row>
                <Col className="col-md-12">
                    <div className='d-flex justify-content-center gap-2 flex-wrap'>
                        {query !== '' ? (
                            filteredPosts.map((filteredPost) =>(
                                <SinglePost 
                                key = {filteredPost._id}
                                post = {filteredPost}
                                author={findAuthorForPost(filteredPost._id)}
                                />
                            ))
                        ) : (posts && 
                            posts.map((post) => (
                                <SinglePost 
                                key= {post._id}
                                post = {post} 
                                author={findAuthorForPost(post._id)}                           
                                />)
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default AllPosts;