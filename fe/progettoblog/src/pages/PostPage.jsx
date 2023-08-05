import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import PostLayout from '../components/PostLayout';
import Footer from '../components/Footer';
const postsApiUrl = "http://localhost:5050/posts/";

const PostPage = ({authors, comments}) => {

    const {postId} = useParams();
    const [post, setPost] = useState({})
    const [author, setAuthor] = useState(null);
    const [commentsPost, setCommentsPost] = useState([]);

    const getPost = async() => {
        try {
            const data = await fetch (postsApiUrl + `${postId}`);
            const response = await data.json();
            setPost(response.postById);
            console.log(response.postById);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        getPost();
    }, [postId])

    useEffect(() => {
        // Trova l'autore associato al post solo se il post ha un autore
        if (post.author) {
          const foundAuthor = authors.find((author) => author._id === post.author._id);
          setAuthor(foundAuthor);
        }

        setCommentsPost(comments.filter((comment) => comment.post === postId));

      }, [post, authors, comments, postId]);

    if (!post || !post._id) {
        return <div>Loading...</div>;
      }

    
    return (
        <>
        <NavigationBar showSearch={false}/>
        <PostLayout post={post} author={author} commentsPost = {commentsPost}/>
        <Footer />
        </>

    )
}

export default PostPage