import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import './SingleAuthor.css';
import { useTheme } from '../components/ThemeContext';

const SingleAuthor = ({author}) => {

    const { theme, toggleTheme } = useTheme();

    return(
            <tr key={author._id}>
                <td className={`d-none d-sm-table-cell ${theme === 'dark' ? 'dark-theme' : ''}`}>{author._id}</td>
                <td className={`text ${theme === 'dark' ? 'dark-theme' : ''}`}>{author.name}</td>
                <td className={`text ${theme === 'dark' ? 'dark-theme' : ''}`}>{author.surname}</td>
                <td className={`text ${theme === 'dark' ? 'dark-theme' : ''}`}>{author.email}</td>
                <td className={`d-none d-sm-table-cell ${theme === 'dark' ? 'dark-theme' : ''}`}>{author.dateOfBirth}</td>
                <td className={`text ${theme === 'dark' ? 'dark-theme' : ''}`}>
                    <img className='author-avatar' src={author.avatar} alt={`${author.name} ${author.surname}`} />
                </td>
                <td className={`${theme === 'dark' ? 'dark-theme' : ''}`}>
                {author.posts.length > 0 ? (
                    <Link to={`/authors/${author._id}`}>
                        <Button className='button' variant='success'>Go to Posts</Button>
                    </Link>
                    ) : (
                    'No posts availables'
                    )}
                </td>
            </tr>
    );
  };

export default SingleAuthor;