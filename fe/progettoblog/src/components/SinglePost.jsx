import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import './SinglePost.css';
import { Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';

const SinglePost = ({post, author}) => {

  const { theme, toggleTheme } = useTheme();
  const MAX_CONTENT_LENGTH = 100
  const textColorClass = theme === 'dark' ? 'yellow' : 'violet';

  const truncatedContent = 
  post.content.length > MAX_CONTENT_LENGTH ? post.content.slice(0, MAX_CONTENT_LENGTH) + '...' 
    : post.content;

    return(
        <Card style={{ width: '20rem' }} key={post._id} className={`my-3 ${theme === 'dark' ? 'dark-theme' : ''}`}>
        <Card.Img className='post-image' variant="top" src={post.cover} />
        <CardHeader>
          <Card.Title>{post.title}</Card.Title>
        </CardHeader>
        <Card.Body>
            <Card.Text className='post-info-text my-0'>Category: {post.category}</Card.Text>
            <Card.Text className='post-info-text my-0'>Read Time: {post.readTime.value} {post.readTime.unit}</Card.Text>
            <Card.Text className='post-content my-2'>{truncatedContent}</Card.Text>
            <Link to={`/posts/${post._id}`} >
              <Button variant="success" className='mt-1 article-button' >Read the article</Button>
            </Link>
          <footer className='d-flex gap-2 mt-2'>
            {author ? (
            <Card.Text className='vertical-alignment-center'>
              <Link className='link' to={`/authors/${author._id}`} >
                <img src={author.avatar} alt="Author Avatar" className="avatar-class mx-2 my-2" />  
                <span className={`x-2 my-2s ${textColorClass}`}>{`${author.name} ${author.surname}`}</span>
              </Link>
            </Card.Text>
          ) : (
            <Card.Text>No author found.</Card.Text>
          )}
          </footer>
        </Card.Body>
      </Card>
    );
};

export default SinglePost;