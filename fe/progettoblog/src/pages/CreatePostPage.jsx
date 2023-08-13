import React from 'react'
import NavigationBar from '../components/NavigationBar'
import CreatePostInput from '../components/CreatePostInput'
import Footer from '../components/Footer'
import { useTheme } from '../components/ThemeContext';

export const CreatePostPage = ({getPosts, getAuthors, getComments, userData}) =>{
    const { theme } = useTheme();
    return(
        <>
        <div className={`${theme === 'dark' ? 'dark-theme' : ''}`}>
        <NavigationBar showSearch={false} userData={userData} />
        <CreatePostInput getPosts={getPosts} getAuthors={getAuthors} getComments={getComments} />
        <Footer />
        </div>
        </>
    )
}

export default CreatePostPage;