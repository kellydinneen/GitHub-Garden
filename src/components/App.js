import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import Header from './Header';
import ProfileVisualization from './ProfileVisualization';
import './App.css';

const App = () => {
  return (
      <>
        <Header />
        <Switch>
          <Route
               path="/"
               render={() => (
                 <Home
                 />
               )}
               exact
            />
             <Route
                  path="/visualizations/:user"
                  render={({ match }) => (
                    <ProfileVisualization
                      userNameToSearch={match.params.user}
                    />
                  )}
                  exact
              />
          </Switch>
        </>
  )
}
export default App
