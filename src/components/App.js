import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import Header from './Header';
import ProfileVisualization from './ProfileVisualization';
import './App.css';

const App = () => {

  const [home, setHome] = useState(true);

  return (
      <>
        <Header home={home} setHome={setHome}/>
        <Switch>
          <Route
               path="/"
               render={() => (
                 <Home setHome={setHome}
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
