import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NotesList({ notes }) {
  if (notes.length === 0) {
    return <h5 className="center">You haven`t any notes</h5>;
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <table className="centered">
          <thead>
            <tr>
              <th>Completed</th>
              <th>Note</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {notes.map(note => {
              return (
                <tr key={note._id}>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        checked={note.completed}
                        readOnly
                      />
                      <span />
                    </label>
                  </td>
                  <td>{note.text}</td>
                  <td>
                    <NavLink
                      to={`/notes/${note._id}`}
                      className="waves-effect waves-light btn"
                    >
                      <i className="material-icons">edit</i>
                    </NavLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
