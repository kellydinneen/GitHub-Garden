import React, { useState, useEffect } from 'react';
import Garden from '../Garden/Garden.js';
import ErrorPage from '../ErrorPage/ErrorPage';
import ProfileLoader from '../ProfileLoader/ProfileLoader';
import ColorKey from '../ColorKey/ColorKey';
import FlowerKey from '../FlowerKey/FlowerKey';
import Modal from '../Modal/Modal';
import './ProfileVisualization.css';
import pvAPI from './ProfileVisualizationApi';

const ProfileVisualization = (props) => {
  const [userGitHubData, setUserGitHubData] = useState('')
  const [cleanUserData, setCleanUserData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [gitHubError, setGitHubError] = useState("");
  const [clickedRepo, setClickedRepo] = useState('');

  const loadUser = async () => {
    try {
      const userPromise = await pvAPI.fetchGitHubData(`https://api.github.com/users/${props.userNameToSearch}`);
      const userData = await userPromise.json();
      setUserGitHubData(userData);
      return userData;
    } catch (err) {
      setGitHubError(err)
    }
  }

  const getLifespans = (filteredRepos) => {
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
    const repoAges = filteredRepos.map(repo => {
      const creationDate = new Date(repo.created_at).getTime();
      const lastUpdate = new Date(repo.updated_at).getTime();
      const repoAge = (lastUpdate - creationDate) / oneDayInMilliseconds
      return repoAge.toFixed(0)
    })
    return repoAges;
  }

  const fetchRepoContributor = async (user, userRepos) => {
    const userName = user.login;
    const repoContainsUser = await Promise.all(
      userRepos.map(async repo => {
        try {
          const contributorsPromise = await pvAPI.fetchGitHubData(`${repo.contributors_url}`);
          const contributorsList = await contributorsPromise.json();
          const contributorNames = contributorsList.map(person => person.login);
          return contributorNames.includes(userName);
        } catch(err) {
          setError(err)
        }
      })
    );
    const filteredUserRepos = userRepos.filter((repo, index) => repoContainsUser[index]);
    return filteredUserRepos
  }

  const loadRepos = async () => {
    try {
      const userPromise = await pvAPI.fetchGitHubData(`https://api.github.com/users/${props.userNameToSearch}/repos?per_page=100`);
      const repoData = await userPromise.json();
      return repoData
    } catch (err) {
      setError(err)
    }
  }

  const getLanguages = async (filteredRepos) => {
    const languages = await Promise.all(
      filteredRepos.map(async repo => {
        try {
          const languagesPromise = await pvAPI.fetchGitHubData(`${repo.url}/languages`);
          const languagesData = await languagesPromise.json();
          const languagesList = [];
          let languageLines = 0;
          for (let language in languagesData) {
            languagesList.push(language)
            languageLines += languagesData[language]
          }
          return [...languagesList, languageLines]
        } catch(err) {
          setError(err)
        }
      }
    )
  );
    return languages
  }

  const getBranchNames = async (filteredRepos) => {
    const repoBranches = await Promise.all(
      filteredRepos.map(async repo => {
        try {
          const branchesPromise = await pvAPI.fetchGitHubData(`https://api.github.com/repos/${props.userNameToSearch}/${repo.name}/branches`);
          const branches = await branchesPromise.json();
          return branches
        } catch(err) {
          setError(err)
        }
      })
    );
    const namesOfBranches = repoBranches.map(repo => {
      const names = repo.map(branch => branch.name);
      return names
    })
    return namesOfBranches
  }

  const consolidateData = (filteredRepos, branchNames, lifespans, repoLangs) => {
    const cleanedUserData = filteredRepos.map((repo, index) => {
      return {
        name: repo.name,
        branches: branchNames[index],
        lifespan: lifespans[index] === 0 ? 1 : lifespans[index],
        languages: repoLangs[index],
        link: repo.html_url
      }
    })
    return cleanedUserData;
  }

  const loadUserInformation = async () => {
    const userGitHub = await loadUser();
    if (!userGitHub.message) {
      const usersRepos = await loadRepos();
      const filteredByContributorUserRepos = await fetchRepoContributor(userGitHub, usersRepos);
      const branchNames = await getBranchNames(filteredByContributorUserRepos)
      const languages = await getLanguages(filteredByContributorUserRepos);
      const lifespans = getLifespans(filteredByContributorUserRepos);
      const consolidatedData = consolidateData(filteredByContributorUserRepos, branchNames, lifespans, languages);
      setCleanUserData(consolidatedData);
      setTimeout(() => {setIsLoaded(true)}, 4000);
    } else {
      setGitHubError(true)
      setIsLoaded(true)
    }
  }

  useEffect(() => {
    loadUserInformation();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main>
      {!isLoaded && <ProfileLoader />}
      {gitHubError && <ErrorPage user={props.userNameToSearch} message={"We couldn't find a profile for"}/>}
      {isLoaded && !gitHubError &&
      <>
        <section className='gardener-info'>
          <a href={userGitHubData.html_url} target="_blank" rel="noreferrer">
            <img
              alt={`The profile from GitHub for ${props.userNameToSearch}`}
              className="user-profile-pic"
              src={userGitHubData.avatar_url}
            />
          </a>
          <h1>Garden of {userGitHubData.name || `@${userGitHubData.login}`}</h1>
        </section>
        {clickedRepo && <Modal repo={clickedRepo} setClickedRepo={setClickedRepo} />}
        <section className="user-visualizations-box">
          {cleanUserData.length > 0 && <Garden
            animate={true}
            setClickedRepo={setClickedRepo}
            clickedRepo={clickedRepo}
            data={cleanUserData}/>}
        </section>
        <div className="slideout-color-key-toggler">
          <h3 className="slideout-key_heading">Hover for key</h3>
          <article className="slideout-color-key_inner">
            <ColorKey />
            <FlowerKey user={props.userNameToSearch}/>
          </article>
        </div>
      </>}
    </main>
  )
}

export default ProfileVisualization;
