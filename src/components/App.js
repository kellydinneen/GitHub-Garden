import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import Header from './Header';
import ProfileVisualization from './ProfileVisualization';
import ErrorPage from './ErrorPage'
import './App.css';

const App = () => {

  return (
      <>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <Header home={true} />
                <Home />
              </>
            )}
          />
          <Route
            path="/visualizations/:user"
            render={({ match }) => (
              <>
                <Header home={false} />
                <ProfileVisualization
                  userNameToSearch={match.params.user}
                />
              </>
            )}
            exact
          />
          <Route render={() => (
            <>
              <Header home={false} />
              <div className="error-wrapper">
                <ErrorPage message={"We don't have a page here."} user={''}/>
              </div>
            </>
          )}
          />
          </Switch>
        </>
  )
}
export default App
