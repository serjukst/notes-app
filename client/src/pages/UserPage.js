import React, { useState, useCallback, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

import Loader from '../components/Loader';
import User from '../components/User';

export default function UserPage() {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [user, setUser] = useState(null);

  const getUser = useCallback(async () => {
    try {
        const fetched = await request('api/users/me', 'GET', null, {
            Authorization: `Bearer ${token}`
        });

        setUser(fetched)
    } catch (e) {}
  }, [token, request]);

  useEffect( () => {
    getUser()
  }, [getUser])

  if(loading) {
      return <Loader />
  }

  return (
    <>
      { !loading && user && <User user={user}/>}
    </>
  )
  
}
