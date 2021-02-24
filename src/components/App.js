import React, { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import Header from './Header';
import ProfileVisualization from './ProfileVisualization';
import './App.css';

const App = () => {

  const [globalGitHubData, setGlobalGitHubData] = useState([]);
  const [error, setError] = useState('');
  const [userNameToSearch, setUserNameToSearch] = useState('');
  //
  const getGlobalGitHubData = async () => {
    const url = '';
    setError('');
    try {
      //some async stufff
      setGlobalGitHubData(['some data']);
    } catch(error) {
      setError(error.message)
    }
  }


  useEffect(() => {
    getGlobalGitHubData()
  }, [])

  return (
      <>
        <Header />
        <Switch>
          <Route
               path="/"
               render={() => (
                 <Home
                   globalGitHubData={globalGitHubData}
                   error={error}
                   userNameToSearch={userNameToSearch}
                   setUserNameToSearch={setUserNameToSearch}
                 />
               )}
               exact
            />
             <Route
                  path="/visualizations/:user"
                  render={() => (
                    <ProfileVisualization
                      userNameToSearch={userNameToSearch}
                    />
                  )}
                  exact
              />
          </Switch>
        </>
  )
}
export default App
