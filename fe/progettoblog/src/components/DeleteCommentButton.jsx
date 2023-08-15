import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';

const DeleteCommentButton = ({commentId, handleRefreshPostComments, setSuccessDeleteMessage, setErrorDeleteMessage }) => {
    

    const fetchDeleteComment = async (commentId) => {

        const token = JSON.parse(localStorage.getItem("userLoggedIn"));
    
        try {
            if (commentId) {
                const url = `http://localhost:5050/comments/${commentId}`;
                const requestOptions = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                };
    
                console.log('URL della richiesta:', url);
                console.log('Intestazioni della richiesta:', requestOptions.headers);
    
                const response = await fetch(url, requestOptions);
    
                console.log('Stato della risposta:', response.status);
    
                if (response.ok) {
                    console.log('Sono nel ramo if response ok');
                    setErrorDeleteMessage('')
                    setTimeout(() => {
                        setSuccessDeleteMessage('Commento eliminato con successo!');
                    }, 2000);
                    handleRefreshPostComments();
                } else {
                    const errorData = await response.json(); // Extract the error message
                    console.log(errorData)
                    setErrorDeleteMessage(errorData.message);
                }
            }
    
        } catch (error) {
            console.log('Errore fetch:', error);
            setErrorDeleteMessage('Errors occured')
        }
    
    }
  return (
    <Button variant="danger" className='my-2' onClick={() => fetchDeleteComment(commentId)}>Delete Comment</Button>
  )
}

export default DeleteCommentButton