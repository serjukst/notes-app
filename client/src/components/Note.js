import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useInput } from '../hooks/input.hook';

export default function Note({ note }) {
  const [completed, setCompleted] = useState(note.completed);
  const { value, bind} = useInput(note.text)
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const history = useHistory();

  const completehandler = async () => {
    try {
      await request(`/api/notes/${note._id}`, 'PATCH', null, {
        Authorization: `Bearer ${token}`,
      });
      setCompleted(prev => !prev);
    } catch (e) {}
  };

  const deteteHandler = async () => {
    try {
      await request(`/api/notes/${note._id}`, 'DELETE', null, {
        Authorization: `Bearer ${token}`,
      });
      history.push('/notes');
    } catch (e) {}
  };

  const saveHandler = async () => {
    try {
      await request(
        `/api/notes/${note._id}`,
        'PUT',
        { text: value },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      history.push('/notes');
    } catch (e) {}
  };

  return (
    <div className="row" id={note._id}>
      <h5 className="center">Edit note:</h5>
      <div className="col s8 offset-s2 flex space-between">
        <div className="flex flex-grow m-r-1">
          <label>
            <input
              type="checkbox"
              onChange={completehandler}
              checked={completed}
            />
            <span />
          </label>
          <input
            type="text"
            disabled={completed}
            {...bind}
          />
        </div>
        <div>
          <button
            onClick={saveHandler}
            className="waves-effect waves-teal btn m-r-1"
          >
            <i className="material-icons">save</i>
          </button>
          <button
            onClick={deteteHandler}
            className="waves-effect waves-teal btn"
          >
            <i className="material-icons">delete</i>
          </button>
        </div>
      </div>
    </div>
  );
}
