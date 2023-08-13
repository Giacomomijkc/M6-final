import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import PostLayout from '../components/PostLayout';
import Footer from '../components/Footer';
import { useTheme } from '../components/ThemeContext';
const postsApiUrl = "http://localhost:5050/posts/";

const PostPage = ({authors, getAuthors, comments}) => {

    const { theme, toggleTheme } = useTheme();
    const {postId} = useParams();
    const [post, setPost] = useState({})
    const [author, setAuthor] = useState(null);
    const [commentsPost, setCommentsPost] = useState([]);

    const getPost = async() => {
        try {
            const data = await fetch (postsApiUrl + `${postId}`);
            const response = await data.json();
            setPost(response.postById);
            setCommentsPost(response.postById.comments);
            //console.log(commentsPost)
            console.log(response.postById);
        } catch (error) {
            console.log(error)
        }
    }

    console.log(commentsPost)

    useEffect(() =>{
        getPost();
    }, [postId])

    const handleRefreshPostComments = () => {
        getPost();
    }

    useEffect(() => {
        // Trova l'autore associato al post solo se il post ha un autore
        if (post.author) {
          const foundAuthor = authors.find((author) => author._id === post.author._id);
          setAuthor(foundAuthor);
        }

      }, [post, authors]);


    if (!post || !post._id) {
        return <div>Loading...</div>;
      }

    
    return (
        <>
        <div className={`${theme === 'dark' ? 'dark-theme' : ''}`}>
        <NavigationBar showSearch={false}/>
        <PostLayout post={post} author={author} authors={authors} getAuthors={getAuthors} commentsPost = {commentsPost} setCommentsPost={setCommentsPost} handleRefreshPostComments={handleRefreshPostComments}/>
        <Footer />
        </div>
        </>

    )
}

export default PostPage