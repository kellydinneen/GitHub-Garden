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
      console.log(userData)
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
          console.log('CONTRIBUT',contributorsList);
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
          console.log('LANG',languagesData);
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
          console.log('BRANCH',branches);
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

  return (
    <main>
      <section className='gardener-info'>
        <a className="user-profile-pic" href={userGitHubData.html_url}>
          <img className="user-profile-pic" src={userGitHubData.avatar_url}/>
        </a>
        <h1 className='gh-user-name'>Garden of {userGitHubData.name || `@${userGitHubData.login}`}</h1>
      </section>
      <section className="user-visualizations-box">
        {cleanUserData.length > 0 && <Garden data={cleanUserData}/>}
      </section>
      <div class="slideout-color-key-toggler">
      <h3 class="slideout-key_heading">Color Key</h3>
      <article class="slideout-color-key_inner">
        <section className="color-key-set">
          <svg className="color-key-seed" viewBox="-150 -150 300 150">
            <path d='M0,-150 C30,-110 40,-80 0,0 C-40,-80 -30,-110 0,-150' fill="#DE2016" />
          </svg>
          <p className="color-key-language">Javascript</p>
        </section>
        <section className="color-key-set">
          <svg className="color-key-seed" viewBox="-150 -150 300 150">
            <path d='M0,-150 C30,-110 40,-80 0,0 C-40,-80 -30,-110 0,-150' fill="#FF3EAA" />
          </svg>
          <p className="color-key-language">HTML</p>
        </section>
        <section className="color-key-set">
          <svg className="color-key-seed" viewBox="-150 -150 300 150">
            <path d='M0,-150 C30,-110 40,-80 0,0 C-40,-80 -30,-110 0,-150' fill="#FCD732" />
          </svg>
          <p className="color-key-language">CSS</p>
        </section>
        <section className="color-key-set">
          <svg className="color-key-seed" viewBox="-150 -150 300 150">
            <path d='M0,-150 C30,-110 40,-80 0,0 C-40,-80 -30,-110 0,-150' fill="#26369E" />
          </svg>
          <p className="color-key-language">SCSS</p>
        </section>
        <section className="color-key-set">
          <svg className="color-key-seed" viewBox="-150 -150 300 150">
            <path d='M0,-150 C30,-110 40,-80 0,0 C-40,-80 -30,-110 0,-150' fill="#F19233" />
          </svg>
          <p className="color-key-language">Java</p>
        </section>
        <section className="color-key-set">
          <svg className="color-key-seed" viewBox="-150 -150 300 150">
            <path d='M0,-150 C30,-110 40,-80 0,0 C-40,-80 -30,-110 0,-150' fill="white" />
          </svg>
          <p className="color-key-language">Objective-C</p>
        </section>
        <section className="color-key-set">
          <svg className="color-key-seed" viewBox="-150 -150 300 150">
            <path d='M0,-150 C30,-110 40,-80 0,0 C-40,-80 -30,-110 0,-150' fill="white" />
          </svg>
          <p className="color-key-language">C++</p>
        </section>
        <section className="color-key-set">
          <svg className="color-key-seed" viewBox="-150 -150 300 150">
            <path d='M0,-150 C30,-110 40,-80 0,0 C-40,-80 -30,-110 0,-150' fill="#76678C" />
          </svg>
          <p className="color-key-language">Python</p>
        </section>
        <section className="color-key-set">
          <svg className="color-key-seed" viewBox="-150 -150 300 150">
            <path d='M0,-150 C30,-110 40,-80 0,0 C-40,-80 -30,-110 0,-150' fill="white" />
          </svg>
          <p className="color-key-language">Java</p>
        </section>
        <section className="color-key-set">
          <svg className="color-key-seed" viewBox="-150 -150 300 150">
            <path d='M0,-150 C30,-110 40,-80 0,0 C-40,-80 -30,-110 0,-150' fill="white" />
          </svg>
          <p className="color-key-language">Objective-C</p>
        </section>
        <section className="color-key-set">
          <svg className="color-key-seed" viewBox="-150 -150 300 150">
            <path d='M0,-150 C30,-110 40,-80 0,0 C-40,-80 -30,-110 0,-150' fill="white" />
          </svg>
          <p className="color-key-language">C++</p>
        </section>
        <section className="color-key-set">
          <svg className="color-key-seed" viewBox="-150 -150 300 150">
            <path d='M0,-150 C30,-110 40,-80 0,0 C-40,-80 -30,-110 0,-150' fill="white" />
          </svg>
          <p className="color-key-language">Python</p>
        </section>
      </article>
    </div>
    </main>
  )
}

export default ProfileVisualization;
