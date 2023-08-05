import React from 'react';
import Table from 'react-bootstrap/Table';
import SingleAuthor from './SingleAuthor';
import Container from 'react-bootstrap/esm/Container';
import { useEffect } from 'react';

const AllAuthorsList = ({authors, getAuthors}) => {

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
    <Container>
      <Table className='mt-5' striped bordered hover>
        <thead>
          <tr>
            <th>#ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Avatar</th>
            <th>Posts</th>
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