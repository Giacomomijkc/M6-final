import React from 'react'
import NavigationBar from '../components/NavigationBar'
import CreatePostInput from '../components/CreatePostInput'
import Footer from '../components/Footer'

export const CreatePostPage = ({getPosts, getAuthors, getComments}) =>{
    return(
        <>
        <NavigationBar showSearch={false} />
        <CreatePostInput getPosts={getPosts} getAuthors={getAuthors} getComments={getComments} />
        <Footer />
        </>
    )
}

export default CreatePostPage;