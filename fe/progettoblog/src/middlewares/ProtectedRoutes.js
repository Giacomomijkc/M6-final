import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Login from "../pages/Login";
import { Outlet, useNavigate } from 'react-router-dom';

const auth = () => {
    return JSON.parse(localStorage.getItem('userLoggedIn'));
};

const useSession = () => {
    const session = auth();
    const decodedSession = session ? jwtDecode(session) : null;

    const navigate = useNavigate();
    
    useEffect(() => {

        if(!session){
            navigate('/login', {replace: true});
        }
    }, [navigate, session]);

    return decodedSession;
};

const ProtectedRoutes = () => {
    const isAuthorized = auth();
    const session = useSession();

    return isAuthorized ? <Outlet /> : <Login />;
}

export default ProtectedRoutes;