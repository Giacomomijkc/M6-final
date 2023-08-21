import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import CreatePostPage from './pages/CreatePostPage';
import CreateAuthorPage from './pages/CreateAuthorPage';
import ErrorPage from './pages/ErrorPage';
import AllAuthorsPage from './pages/AllAuthorsPage';
import PostPage from './pages/PostPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Success from './pages/Success';
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import AllAuthorPosts from './components/AllAuthorPosts';
import { ThemeProvider } from './components/ThemeContext';
import './App.css';
const apiUrl = 'http://localhost:5050/posts';
const authorsApiUrl = "http://localhost:5050/authors/";
const commentsApiUrl = "http://localhost:5050/comments/";


const App = () => {

  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [authors, setAuthors] = useState([]);
  const [comments, setComments] = useState([]);

  const [userData, setUserData] = useState(null);
  const [postDetails, setPostDetails] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);



  const getPosts = async (page) => {
    try {
      const apiUrlWithPage = `http://localhost:5050/posts?page=${page}`;
      const data = await fetch(apiUrlWithPage);
      const response = await data.json();
      console.log(response)
      setPosts([...posts, ...response.posts]);
      setTotalPages(Math.ceil(response.totalPosts / postsPerPage));
    } catch (error) {
      console.log(error);
    }
  };


  const getAuthors = async () => {
    try {
      const data = await fetch(authorsApiUrl);
      const response = await data.json();
      console.log(response);
      setAuthors(response.authors);
      console.log(response.authors)
    } catch (error) {
      console.log(error)
    }
  }

  const getComments = async() => {
    try {
      const data = await fetch(commentsApiUrl);
      const response = await data.json();
      console.log(response);
      setComments(response.comments);
    } catch (error) {
      console.log(error)
    }
  }

  const getUserData = async() => {
    try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));

      const response = await fetch('http://localhost:5050/dashboard', {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": token
          },
      });

      if (!response.ok) {
        return;
      }
      
      const data = await response.json();
      setUserData(data);
      console.log(data)

    } catch (error) {
      console.error('Error occurred during fetching user data:', error);
    }

  }


  return (
    <>
    <ThemeProvider>
    <div className='app-container'>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage 
          posts={posts} 
          query={query} 
          setQuery={setQuery} 
          authors={authors} 
          getPosts={getPosts} 
          getAuthors={getAuthors}
          getComments={getComments}
          userData ={userData}
          getUserData = {getUserData}
          totalPages={totalPages}
          postsPerPage ={postsPerPage}
          />} />
        <Route exact path="/login" element={<Login />}/>
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/create-post" element={<CreatePostPage getPosts={getPosts} userData={userData} />} />
          <Route exact path="/dashboard" element={<Dashboard setPostDetails={setPostDetails}  />}/>
        </Route>
        <Route exact path="/create-author" element={<CreateAuthorPage getAuthors={getAuthors} />}/>
        <Route exact path="/authors-page" element={<AllAuthorsPage authors={authors} getAuthors={getAuthors} userData={userData}  />}/>
        <Route exact path="/posts/:postId" element={<PostPage showSearch={false} authors={authors} getAuthors={getAuthors} comments={comments} userData={userData}  />}/>
        <Route exact path="/authors/:authorId" element={<AllAuthorPosts query={query} setQuery={setQuery} userData={userData} />}/>
        <Route exact path="/success" element={<Success  />}/>
        <Route path="*" element={<ErrorPage showSearch={false} userData={userData}/>}/>
      </Routes>
    </BrowserRouter>
    </div>
    </ThemeProvider>
    </>
  );
}

export default App;
