import React from 'react';
import Image from 'react-bootstrap/Image';
import { Container, Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import './PostLayout.css';

const PostLayout = ({post, author, commentsPost}) => {
  return (
    <>
    <Container className='centered'>
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
                {commentsPost && commentsPost.map((commentPost) => {
                    return (
                        <>
                        <Card className='my-5'>
                            <CardHeader>
                                <Card.Title>Rate: {commentPost.rate}</Card.Title>
                            </CardHeader>
                            <Card.Body>
                                <Card.Text>Comment: {commentPost.content}</Card.Text>
                            </Card.Body>
                        </Card>
                        </>
                    );
                })}
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default PostLayout