import React, {useEffect} from 'react'
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import Container from 'react-bootstrap/Container';

export const ErrorPage = ({userData, fetchUserDataAndPostDetails}) => {

 
  useEffect(() => {        
    fetchUserDataAndPostDetails();
  }, []);
  
  console.log(userData);

  return (
    <>
    <NavigationBar showSearch={false} userData={userData} />
    <Container className='fluid'>
      <div>
          <div className='alert alert-warning' role='alert'>OOOps, non abbiamo trovato questa pagina</div>
      </div>
    </Container>
    <Footer />
    </>
  )
}

export default ErrorPage;