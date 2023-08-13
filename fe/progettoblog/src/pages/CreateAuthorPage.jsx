import React from 'react'
import NavigationBar from '../components/NavigationBar'
import CreateAuthorInput from '../components/CreateAuthorInput'
import Footer from '../components/Footer'
import { useTheme } from '../components/ThemeContext';
import './createAuthorPage.css';

export const CreateAuthorPage = ({getAuthors}) =>{
    const { theme } = useTheme();
    return(
        <>
        <div className={`content-container ${theme === 'dark' ? 'dark-theme' : ''}`}>
            <NavigationBar showSearch={false} />
            <CreateAuthorInput getAuthors={getAuthors} />
            <Footer />
        </div>
        </>
    )
}

export default CreateAuthorPage;