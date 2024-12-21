import React, { useContext } from 'react'
import LoginCard from '../components/auth/LoginCard'
import { UserContext } from '../components/home/userContextProvider';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { user, loading } = useContext(UserContext);
  return (
    <>
    {!user ? <LoginCard/>:<Navigate to={'/home'}/>}
    </>
  )
}

export default LoginPage