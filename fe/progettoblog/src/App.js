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
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import AllAuthorPosts from './components/AllAuthorPosts';
const apiUrl = 'http://localhost:5050/posts';
const authorsApiUrl = "http://localhost:5050/authors/";
const commentsApiUrl = "http://localhost:5050/comments/";


const App = () => {

  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [authors, setAuthors] = useState([]);
  const [comments, setComments] = useState([]);

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



  return (
    <>
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
          />} />
        <Route exact path="/login" element={<Login />}/>
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/create-post" element={<CreatePostPage getPosts={getPosts} />} />
          <Route exact path="/dashboard" element={<Dashboard />}/>
        </Route>
        <Route exact path="/create-author" element={<CreateAuthorPage getAuthors={getAuthors} />}/>
        <Route exact path="/authors-page" element={<AllAuthorsPage authors={authors} getAuthors={getAuthors}  />}/>
        <Route exact path="/posts/:postId" element={<PostPage showSearch={false} authors={authors} comments={comments} />}/>
        <Route exact path="/authors/:authorId" element={<AllAuthorPosts query={query} setQuery={setQuery}  />}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
