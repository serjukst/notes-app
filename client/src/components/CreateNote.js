import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useInput } from '../hooks/input.hook';

export default function CreateNote() {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const { value, bind, reset } = useInput('');
  const history = useHistory();

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        await request(
          `/api/notes`,
          'POST',
          { text: value },
          {
            Authorization: `Bearer ${token}`,
          }
        );
        reset();
        history.push('/') // TODO rewfite
      } catch (e) {}
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input
            placeholder="Note"
            id="note"
            type="text"
            {...bind}
            onKeyPress={pressHandler}
            disabled={loading}
          />
          <label htmlFor="note">Add note</label>
        </div>
      </div>
    </div>
  );
}
