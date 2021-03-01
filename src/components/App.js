import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import Header from './Header';
import ProfileVisualization from './ProfileVisualization';
import ErrorPage from './ErrorPage'
import './App.css';

const App = () => {

  const [home, setHome] = useState(true);

  return (
      <>
        <Header home={home} setHome={setHome}/>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home setHome={setHome} />
            )}
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
          <Route render={() => (
            <div className="error-wrapper">
              <ErrorPage message={"We don't have a page here."} user={''}/>
            </div>
          )}
          />
          </Switch>
        </>
  )
}
export default App
