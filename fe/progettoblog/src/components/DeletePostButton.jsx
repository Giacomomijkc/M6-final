import React from 'react'
import Button from 'react-bootstrap/Button';
const apiUrl ='http://localhost:5050/posts';



const DeletePostButton = ({postId, refreshPosts, authorId}) => {


    const fetchDeletPost = async(postId, authorId) => {


        try {
            const token = JSON.parse(localStorage.getItem("userLoggedIn"));
            console.log(postId)
            const response = await fetch(`${apiUrl}/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({authorId: authorId })
            })

            if(response.ok){
                console.log('Post successfully deleted')
                refreshPosts()
            } else {
                console.log("Errors occured':", response.status, response.statusText);
            }

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Button variant="danger" className='my-2' onClick={() => fetchDeletPost(postId, authorId)}>Delete Post</Button>
  )
}

export default DeletePostButton