import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
const apiUrl ='http://localhost:5050/authors';


const DeleteAuthorButton = ({authorId, authorPosts}) => {

    const navigate = useNavigate();
    
    const fetchDeletAuthor = async(authorId, authorPosts) => {


        try {
            const token = JSON.parse(localStorage.getItem("userLoggedIn"));
            const response = await fetch(`${apiUrl}/${authorId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({authorPosts: authorPosts })
            })

            if(response.ok){
                console.log('Author and Author Posts successfully deleted')
                localStorage.removeItem("userLoggedIn")
                navigate('/')
            } else {
                console.log("Errors occured':", response.status, response.statusText);
            }

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Button variant='danger' className='mx-2' onClick={() => fetchDeletAuthor(authorId, authorPosts)}>Delete Your Account</Button>
  )
}

export default DeleteAuthorButton