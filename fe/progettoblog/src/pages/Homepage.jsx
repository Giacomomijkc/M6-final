import React, { useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import AllPosts from '../components/AllPosts';
import Footer from '../components/Footer';
import './homepage.css'
import { useTheme } from '../components/ThemeContext';

export const Homepage = ({ posts, query, setQuery, authors, getPosts, getAuthors, getComments, userData, getUserData, totalPages, postsPerPage }) => {
  const { theme } = useTheme();


  useEffect (() => {
    getUserData();
  },[])
  return (
    <>
    <div className={`content-container ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <NavigationBar query={query} setQuery={setQuery} showSearch={true} userData={userData} />
      <AllPosts posts={posts} query={query} getPosts={getPosts} authors={authors} getAuthors={getAuthors} getComments={getComments} totalPages={totalPages} postsPerPage ={postsPerPage} />
      <Footer className='footer' />
    </div>
    </>
  )
}

export default Homepage;