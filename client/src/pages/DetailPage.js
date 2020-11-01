import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

import Loader from '../components/Loader';
import Note from '../components/Note';

export default function DetailPage() {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [note, setNote] = useState(null);
  const noteId = useParams().id;

  const getNote = useCallback(async () => {
    try {
        const fetched = await request(`/api/notes/${noteId}`, 'GET', null, {
            Authorization: `Bearer ${token}`
        });

        setNote(fetched)
    } catch (e) {}
  }, [token, noteId, request]);

  useEffect( () => {
    getNote()
  }, [getNote])

  if(loading) {
      return <Loader />
  }

  return (
    <>
      { !loading && note && <Note note={note}/>}
    </>
  )
  
}
