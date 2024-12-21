import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { SidebarDemo } from '../components/home/SideBar';
import { UserContext } from '../components/home/userContextProvider';

const PrivetRouter = () => {
    const { user, loading } = useContext(UserContext);
console.log(user,'this is user');

    
    return user ? (
        <SidebarDemo>
            <Outlet />
        </SidebarDemo>
    ) : <Navigate to={'/'}/>; 
};

export default PrivetRouter;
