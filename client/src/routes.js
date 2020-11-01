import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from './pages/AuthPage';

import DetailPage from './pages/DetailPage';
import NotesPage from './pages/NotesPage';
import UserPage from './pages/UserPage';

export const useRouters = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/notes" exact>
          <NotesPage />
        </Route>
        <Route path="/notes/:id">
          <DetailPage />
        </Route>
        <Route path="/user">
          <UserPage />
        </Route>
        <Redirect to="/notes" />
      </Switch>
    );
  }

  return (
    <Switch>
        <Route path="/" exact>
            <AuthPage/>
        </Route>
        <Redirect to="/" />
    </Switch>);
};
