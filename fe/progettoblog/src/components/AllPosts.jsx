import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import SinglePost from './SinglePost';
import Pagination from 'react-bootstrap/Pagination';
import {useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './AllPosts.css';

const AllPosts = ({posts, query, authors, getPosts, getAuthors, getComments, totalPages, postsPerPage}) => {
    const { theme } = useTheme();
    const [currentPage, setCurrentPage] = useState(1);

    console.log(currentPage)
    console.log(totalPages)

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    useEffect(() => {
        getPosts(currentPage);
      }, [currentPage]);


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
          
    const postsToDisplay = query !== '' ? filteredPosts : posts;
    const currentPosts = postsToDisplay.slice(startIndex, endIndex);
          

    if (!posts) {
            return <div>Loading...</div>;
    }

    return(
        <div className={` ${theme === 'dark' ? 'dark-theme' : ''}`}>
            <Container className={`fluid justify-content-center ${theme === 'dark' ? 'dark-theme' : ''}`}>
            <Row>
                <Col className="col-md-12">
                    <div className='d-flex justify-content-center gap-2 flex-wrap'>
                    {currentPosts && currentPosts.map((currentPost)=> (
                           <SinglePost 
                           key = {currentPost._id}
                           post = {currentPost}
                           author={findAuthorForPost(currentPost._id)}
                           />
                    ))} 
                    </div>
                    <div className='d-flex justify-content-center gap-2 flex-wrap' >
                        <TransitionGroup className="pagination-container">
                            <CSSTransition
                                key={currentPage}
                                timeout={300}
                                classNames="pagination-slide"
                            >
                                <Pagination className="mt-4 justify-content-center">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <Pagination.Item
                                            key={index + 1}
                                            active={index + 1 === currentPage}
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </Pagination.Item>
                                    ))}
                                </Pagination>
                            </CSSTransition>
                        </TransitionGroup>
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default AllPosts;