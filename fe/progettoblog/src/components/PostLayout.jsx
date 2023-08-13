import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Container, Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import EditCommentModal from './EditCommentModal';
import MakeCommentModal from './MakeCommentModal';
import { useTheme } from '../components/ThemeContext';
import './PostLayout.css';

const PostLayout = ({post, authors, getAuthors, author, commentsPost, handleRefreshPostComments}) => {

    const { theme, toggleTheme } = useTheme();

    const [commentAuthors, setCommentAuthors] = useState({});
    const [showComment, setShowComment] = useState(false);
    const [show, setShow] = useState(false);
    const [commentIdToEdit, setCommentIdToEdit] = useState(null);

    const handleCloseComment = () => setShowComment(false);
    const handleShowComment = () => setShowComment(true);
    const handleShow = () => setShow(true);

    const isIdCommentToEdit = (commentId) => {
        return commentIdToEdit !== null && commentIdToEdit === commentId;
      };


    const handleIdCommentToEdit = (commentId) => {
        setCommentIdToEdit(commentId);
    };


    useEffect(() => {
        getAuthors();
    },[])

    useEffect(() => {
        if (authors && authors.length > 0) {
          const authorsMap = {};
          authors.forEach(author => {
            authorsMap[author._id] = author;
          });
          setCommentAuthors(authorsMap);
        }
      }, [authors]);
      

    console.log(authors)


  return (
    <>
    <Container  className={`centered ${theme === 'dark' ? 'dark-theme' : ''}`}>
        <Row>
            <Col  md={{ span: 8, offset: 2 }} className='centered-content'>
                <Image className='aling-center my-3 cover-article' src={post.cover} fluid />
                {author ? (
                    <div className='vertical-alignment-center'>
                         <span className="avatar-clas mx-2 my-2s">Written by {`${author.name} ${author.surname}`}</span>
                         <img src={author.avatar} alt="Author Avatar" className="avatar-class mx-2 my-2" />
                    </div>
                ) : (
                    <div>No author found.</div>
                )}
                <div className='vertical-alignment-center'>
                    <span className='post-info-text my-0 mx-2'>Category: {post.category}</span>
                    <span className='post-info-text my-0 mx.2'>ReadTime: {post.readTime.value} {post.readTime.unit}</span>
                </div>
                <h1 className='text-center my-3'>{post.title}</h1>
                <p className='text-center my-3'>{post.content}</p>
                <Container className="centerd">
                    <Row>
                        <Col md={{ span: 8, offset: 2 }} className='centered-content'>
                            {commentsPost && commentsPost.length > 0 && (
                                <Button variant="primary" onClick={handleShowComment}>
                                    Show Comments
                                </Button>
                            )}
                            {showComment &&
                                <>
                                <div className='d-flex justify-content-center gap-1 flex-wrap'>
                                {commentsPost && commentsPost.map((commentPost, renderIndex) => {
                                    const commentAuthor = commentAuthors && commentAuthors[commentPost.author];
                                    return (
                                    <>
                                    <Card key={commentPost._id} className={`my-2 ${theme === 'dark' ? 'dark-theme' : ''}`} style={{ width: '15rem' }}>
                                        <CardHeader>
                                            <Card.Title className='comment-info-text my-0'>Rate: {commentPost.rate}</Card.Title>
                                        </CardHeader>
                                        <Card.Body>
                                            <Card.Text className='comment-content-text my-0'>{commentPost.content}</Card.Text>
                                        </Card.Body>
                                        <Card.Footer className='vertical-alignment-center'>
                                                {commentAuthor && (
                                                    <div >
                                                        <img src={commentAuthor.avatar} alt="Author Avatar" className="avatar-class mx-2 mt-2 justify-content-center align-items-center" />
                                                        <span className="justify-content-center align-items-center">{commentAuthor.name} {commentAuthor.surname}</span>
                                                    </div>
                                                )}
                                                <Button variant="warning" className='mt-1 article-buttons' onClick={() => handleIdCommentToEdit(commentPost._id)} key={"button" + renderIndex} id={"button" + renderIndex} >Edit comment</Button>                                            
                                            </Card.Footer>
                                    </Card>
                                    {isIdCommentToEdit(commentPost._id) && 
                                    
                                        (
                                            <EditCommentModal 
                                            commentId={commentPost._id} 
                                            handleIdCommentToEdit={handleIdCommentToEdit}
                                            handleRefreshPostComments={handleRefreshPostComments}                                            
                                            />
                                        )}
                                    </>
                                    );
                                })
                                }
                                </div>
                                {commentsPost && commentsPost.length > 0 && (
                                <Button variant="primary" onClick={handleCloseComment}>
                                    Close Comments
                                </Button>
                                )}
                                </>
                            }
                            <Button variant="primary" onClick={handleShow}>
                                Make a Comment
                            </Button>
                            {handleShow &&(
                                <MakeCommentModal show={show} setShow={setShow} handleRefreshPostComments={handleRefreshPostComments} postId={post._id} />
                            )}
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default PostLayout