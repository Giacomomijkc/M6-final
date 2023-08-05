import React from 'react';
import NavigationBar from '../components/NavigationBar';
import AllAuthorsList from '../components/AllAuthorsList';
import Footer from '../components/Footer';

const AllAuthorsPage = ({authors, getAuthors}) => {

    return(
        <>
        <NavigationBar showSearch={false} />
        <AllAuthorsList authors={authors} getAuthors={getAuthors} />
        <Footer />
        </>
    )
}

export default AllAuthorsPage;