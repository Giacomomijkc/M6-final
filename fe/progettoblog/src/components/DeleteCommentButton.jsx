import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';

const DeleteCommentButton = ({commentId, handleRefreshPostComments }) => {
    
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
                    setTimeout(() => {
                        setSuccessMessage('Commento eliminato con successo!');
                    }, 2000);
                    handleRefreshPostComments();
                } else if (response.status === 500) {
                    console.log('Errore del server interno:', response.status);
                    // Gestisci l'errore 500 qui, ad esempio mostrando un messaggio all'utente
                } else {
                    console.log('Risposta non ok:', response.status);
                    // Gestisci altri errori qui, ad esempio mostrando un messaggio all'utente
                }
            }
    
        } catch (error) {
            console.log('Errore fetch:', error);
        }
    
    }
  return (
    <Button variant="danger" className='my-2' onClick={() => fetchDeleteComment(commentId)}>Delete Post</Button>
  )
}

export default DeleteCommentButton