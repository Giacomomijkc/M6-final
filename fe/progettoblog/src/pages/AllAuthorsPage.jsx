import React from 'react';
import NavigationBar from '../components/NavigationBar';
import AllAuthorsList from '../components/AllAuthorsList';
import Footer from '../components/Footer';
import { useTheme } from '../components/ThemeContext';
import './allAuthorPage.css'

const AllAuthorsPage = ({authors, getAuthors, userData}) => {
    const { theme } = useTheme();

    return(
        <>
        <div className={`content-container ${theme === 'dark' ? 'dark-theme' : ''}`}>
            <NavigationBar showSearch={false} userData={userData} />
            <AllAuthorsList authors={authors} getAuthors={getAuthors} />
            <Footer />
        </div>
        </>
    )
}

export default AllAuthorsPage;