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

  const getPosts = async() => {
    try {
      const data = await fetch(apiUrl);
      const response = await data.json();
      console.log(response)
      setPosts(response.posts);
      console.log(posts)
      
    } catch (error) {
      console.log(error)
    }
  }

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

  const fetchUserDataAndPostDetails = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userLoggedIn"));
      
      if (!token) {
        // Il token non è presente, gestire il caso in cui l'utente non sia autenticato
        return <div className='alert alert-warning mt-5' role='alert'>Non autorizzato</div>;
      }
      
      const response = await fetch('http://localhost:5050/dashboard', {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": token
          },
      });
      
      if (!response.ok) {
        // Gestisci il caso in cui la richiesta fallisca o l'utente non sia autorizzato
        return;
      }
      
      const data = await response.json();
      setUserData(data); // Imposta i dati dell'utente nello stato locale
      console.log(data)
  
  
      const posts = data.posts;
  
      if(!posts){
        return <div className='alert alert-warning mt-5' role='alert'>Non ci sono posts</div>;
      }
  
      const dataPosts = await Promise.all(
        posts.map(async (postId) => {
          const response = await fetch(`http://localhost:5050/posts/${postId}`);
                
        if (!response.ok) {
          throw new Error('Failed to fetch post details');
        }
              
        return response.json()
        })
      );
              
      console.log('fine Post')
      setPostDetails(dataPosts)
            
      } catch (error) {
        console.error('Error occurred during fetching user data:', error);
      }
    };

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
          fetchUserDataAndPostDetails = {fetchUserDataAndPostDetails}
          />} />
        <Route exact path="/login" element={<Login />}/>
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/create-post" element={<CreatePostPage getPosts={getPosts} userData={userData} />} />
          <Route exact path="/dashboard" element={<Dashboard setPostDetails={setPostDetails} userData={userData} postDetails={postDetails} fetchUserDataAndPostDetails={fetchUserDataAndPostDetails} />}/>
        </Route>
        <Route exact path="/create-author" element={<CreateAuthorPage getAuthors={getAuthors} />}/>
        <Route exact path="/authors-page" element={<AllAuthorsPage authors={authors} getAuthors={getAuthors} userData={userData}  />}/>
        <Route exact path="/posts/:postId" element={<PostPage showSearch={false} authors={authors} getAuthors={getAuthors} comments={comments} userData={userData}  />}/>
        <Route exact path="/authors/:authorId" element={<AllAuthorPosts query={query} setQuery={setQuery} userData={userData}  />}/>
        <Route exact path="/success" element={<Success  />}/>
        <Route path="*" element={<ErrorPage showSearch={false} userData={userData} fetchUserDataAndPostDetails={fetchUserDataAndPostDetails}/>}/>
      </Routes>
    </BrowserRouter>
    </div>
    </ThemeProvider>
    </>
  );
}

export default App;
