import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Garden from './Garden.js';
import './ProfileVisualization.css';
import pvAPI from './ProfileVisualizationApi';

const ProfileVisualization = (props) => {
  const [userGitHubData, setUserGitHubData] = useState('')
  const [cleanUserData, setCleanUserData] = useState([]);
  const [newUserNameToSearch, setNewUserNameToSearch] = useState('');
  const [error, setError] = useState('');

  const loadUser = async () => {
    try {
      const userPromise = await pvAPI.fetchGitHubData(`https://api.github.com/users/${props.userNameToSearch}`);
      const userData = await userPromise.json();
      setUserGitHubData(userData);
      return userData;
    } catch (err) {
      setError(err)
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
      const userPromise = await pvAPI.fetchGitHubData(`https://api.github.com/users/${props.userNameToSearch}/repos`);
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
        languages: repoLangs[index]
      }
    })
    return cleanedUserData;
  }

  useEffect(() => {
    const loadUserInformation = async () => {
      const userGitHub = await loadUser();
      const usersRepos = await loadRepos();
      const filteredByContributorUserRepos = await fetchRepoContributor(userGitHub, usersRepos);
      const branchNames = await getBranchNames(filteredByContributorUserRepos)
      const languages = await getLanguages(filteredByContributorUserRepos);
      const lifespans = getLifespans(filteredByContributorUserRepos);
      const consolidatedData = consolidateData(filteredByContributorUserRepos, branchNames, lifespans, languages);
      setCleanUserData(consolidatedData)
    }
    loadUserInformation();
  }, [])

  // <svg className="soil-line-one" viewBox="0 0 2000 500">
  //   <path d='M0,400 C100,300 150,450 200,410 C250,370 270,420 370,410 C450,370 470,420 480,360 C500,370 520,420 560,400 C600,370 620,420 660,400 C700,370 720,420 760,400 C800,300 850,450 900,410 C950,370 970,420 980,360 C1050,370 1070,420 1080,360 C1200,370 1220,420 1260,400 C1300,300 1350,450 1400,410 C1450,370 1470,420 1570,410 C1650,370 1670,420 1680,360 C1750,370 1770,420 1780,360 C1800,370 1820,420 1860,400 C1900,300 1950,450 2000,410'  stroke='grey' fill='none' stroke-width='3px'/>
  // </svg>
  // <svg className="soil-line-two" viewBox="0 0 2000 500">
  //   <path d='M0,400 C100,300 150,450 200,410 C250,370 270,420 370,410 C450,370 470,420 480,360 C500,370 520,420 560,400 C600,370 620,420 660,400 C700,370 720,420 760,400 C800,300 850,450 900,410 C950,370 970,420 980,360 C1050,370 1070,420 1080,360 C1200,370 1220,420 1260,400 C1300,300 1350,450 1400,410 C1450,370 1470,420 1570,410 C1650,370 1670,420 1680,360 C1750,370 1770,420 1780,360 C1800,370 1820,420 1860,400 C1900,300 1950,450 2000,410'  stroke='grey' fill='none' stroke-width='3px'/>
  // </svg>
  // <svg className="soil-line-three" viewBox="0 0 2000 500">
  //   <path d='M0,400 C100,300 150,450 200,410 C250,370 270,420 370,410 C450,370 470,420 480,360 C500,370 520,420 560,400 C600,370 620,420 660,400 C700,370 720,420 760,400 C800,300 850,450 900,410 C950,370 970,420 980,360 C1050,370 1070,420 1080,360 C1200,370 1220,420 1260,400 C1300,300 1350,450 1400,410 C1450,370 1470,420 1570,410 C1650,370 1670,420 1680,360 C1750,370 1770,420 1780,360 C1800,370 1820,420 1860,400 C1900,300 1950,450 2000,410'  stroke='grey' fill='none' stroke-width='3px'/>
  // </svg>

  return (
    <main>
      <h1>{userGitHubData.name || `@${userGitHubData.login}`}</h1>
      <a href={userGitHubData.html_url}>
        <img className="user-profile-pic" src={userGitHubData.avatar_url}/>
      </a>
      <section className="user-visualizations-box">
        {cleanUserData.length > 0 && <Garden data={cleanUserData}/>}
      </section>
      <input
        aria-label="Search bar for GitHub users"
        className="search-bar"
        placeholder="Search another user"
        value={newUserNameToSearch}
        onChange={event => setNewUserNameToSearch(event.target.value)}>
      </input>
      <Link to={{
        pathname:`/visualizations/${newUserNameToSearch}`,
      }}>
        <button className='search-button'>Search</button>
      </Link>
    </main>
  )
}

export default ProfileVisualization;
