import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useInput } from '../hooks/input.hook';
import { useMessage } from '../hooks/message.hook';

export default function User({ user }) {
  const { request, loading } = useHttp();
  const message = useMessage();
  const { token, logout } = useContext(AuthContext);
  const { value: oldPass, bind: bindOldPass, reset: resetOldPass } = useInput('');
  const { value: newPass, bind: bindNewPass, reset: resetNewPass } = useInput('');

  const deleteUserHandler = async () => {
    try {
      await request(
        `/api/users/me`,
        'DELETE', null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      message('User deleted');
      logout();
    } catch (e) {
      message(e.message);
    }
  };

  const changePassHandler = async () => {
    try {
      await request(
        `/api/users/me`,
        'PATCH',
        {
          oldPassword: oldPass,
          newPassword: newPass,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      resetOldPass();
      resetNewPass();
      message('Password changed');
    } catch (e) {
      message(e.message);
    }
  };

  return (
    <div className="container">
      <table className="centered">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Member since</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.username}</td>
            <td>{new Date(user.createdDate).toLocaleString()}</td>
            <td>
              <button className="waves-effect waves-light btn" onClick={deleteUserHandler} disabled={loading}>
                Delete profile
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="bordered">
        <h6>You can change password</h6>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="oldPassword"
              type="password"
              className="validate"
              {...bindOldPass}
            />
            <label htmlFor="oldPassword">Old password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="newPassword"
              type="password"
              className="validate"
              {...bindNewPass}
            />
            <label htmlFor="newPassword">New password</label>
          </div>
          <div className="row">
            <button
              className="waves-effect waves-light btn"
              onClick={changePassHandler}
              disabled={loading}
            >
              Change password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
