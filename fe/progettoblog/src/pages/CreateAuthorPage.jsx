import React from 'react'
import NavigationBar from '../components/NavigationBar'
import CreateAuthorInput from '../components/CreateAuthorInput'
import Footer from '../components/Footer'

export const CreateAuthorPage = ({getAuthors}) =>{
    return(
        <>
        <NavigationBar showSearch={false} />
        <CreateAuthorInput getAuthors={getAuthors} />
        <Footer />
        </>
    )
}

export default CreateAuthorPage;