import React, { useState, useCallback, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

import Loader from '../components/Loader';
import NotesList from '../components/NotesList';
import CreateNote from '../components/CreateNote';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchNotes = useCallback(async () => {
    try {
      const fetched = await request('/api/notes', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });

      setNotes(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!loading && (
        <>
          <CreateNote /> <NotesList notes={notes} />
        </>
      )}
    </>
  );
}
