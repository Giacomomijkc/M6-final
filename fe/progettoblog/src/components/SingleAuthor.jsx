import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import './SingleAuthor.css';

const SingleAuthor = ({author}) => {
    return(
            <tr key={author._id}>
                <td>{author._id}</td>
                <td>{author.name}</td>
                <td>{author.surname}</td>
                <td>{author.email}</td>
                <td>{author.dateOfBirth}</td>
                <td>
                    <img className='author-avatar' src={author.avatar} alt={`${author.name} ${author.surname}`} />
                </td>
                <td>
                    <Link to={`/authors/${author._id}`} >
                     <Button variant='success'>Go to Posts</Button>
                    </Link>
                </td>
            </tr>
    );
  };

export default SingleAuthor;