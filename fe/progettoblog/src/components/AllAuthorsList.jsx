import React from 'react';
import Table from 'react-bootstrap/Table';
import SingleAuthor from './SingleAuthor';
import Container from 'react-bootstrap/esm/Container';
import { useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';

const AllAuthorsList = ({authors, getAuthors}) => {

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    getAuthors();
},[])


if (!authors || authors.length === 0) {
    console.log(authors)
    return <div>Loading...</div>;
}

if (authors.length === 0) {
    return <div>No authors found.</div>;
}

  return (
    <Container >
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={`d-none d-sm-table-cell ${theme === 'dark' ? 'dark-theme' : ''}`}>#ID</th>
            <th className={`${theme === 'dark' ? 'dark-theme' : ''}`}>Name</th>
            <th className={`${theme === 'dark' ? 'dark-theme' : ''}`}>Surname</th>
            <th className={`${theme === 'dark' ? 'dark-theme' : ''}`}>Email</th>
            <th className={`d-none d-sm-table-cell ${theme === 'dark' ? 'dark-theme' : ''}`}>Date of Birth</th>
            <th className={`${theme === 'dark' ? 'dark-theme' : ''}`}>Avatar</th>
            <th className={`${theme === 'dark' ? 'dark-theme' : ''}`}>Posts</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <SingleAuthor key={author._id} author={author} />
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default AllAuthorsList;