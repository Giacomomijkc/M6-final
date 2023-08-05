import React from 'react'
import { useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import AllPosts from '../components/AllPosts';
import Footer from '../components/Footer';

export const Homepage = ({ posts, query, setQuery, authors, getPosts, getAuthors, getComments }) => {



  return (
    <>
        <NavigationBar query ={query} setQuery={setQuery} showSearch={true}/>
        <AllPosts posts = {posts} query ={query} getPosts={getPosts} authors={authors} getAuthors={getAuthors} getComments={getComments} />
        <Footer />
    </>
  )
}

export default Homepage;