# GitHub Garden
## A whimsical visualization of GitHub profiles and events
#### Turing School of Software Design - Mod3 Stretch Project

### Contributors
**Kelly Dinneen** : [github profile](https://github.com/kellydinneen)

*[see Kelly's profile visualized using this app](https://githubgarden.herokuapp.com/visualizations/kellydinneen)*

**Chris Spohn** : [github profile](https://github.com/CJSpohn)

*[see Chris's profile visualized using this app](https://githubgarden.herokuapp.com/visualizations/CJSpohn)*

### Instructors: 
**Leta Keana** : [github profile](https://github.com/letakeane)

*[see Leta's profile visualized using this app](https://githubgarden.herokuapp.com/visualizations/letakeane)*

**Scott Ertmer** : [github profile](https://github.com/sertmer)

*[see Scott's profile visualized using this app](https://githubgarden.herokuapp.com/visualizations/sertmer)*

### Technologies

**Build**: D3, Leaflet, React Leaflet, React Router

**Testing**: Cypress

**Deployment**: Heroku

## Table of Contents
1. [Introduction](#introduction)
3. [Instructions](#setup-instructions)
4. [How-To](#using-github-garden)
5. [Future Plans](#notes-and-plans-for-future-iterations)

## Introduction
This app presents garden-themed visualizations of GitHub user profiles as well as a real time map of GitHub activity around the world. It is the developers' second project in Module 3 of the Front-End Engineering program at Denver's Turing School of Software and Design. The project is primarily an opportunity for the developers to learn the basics of D3.js, a data visualization library, and to refine their skills with Javascript and React. More details about the context for the project can be found in [this project spec](https://frontend.turing.io/projects/module-3/stretch.html).

## Setup Instructions
To run the project locally:
- [obtain a personal API key for GitHub](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)
- [obtain a personal API key for OpenCage data](https://opencagedata.com/api)
- `git clone` this repo
- `cd` into the github-garden repo
- run `npm install`
- add your keys to a .env file in the root folder of the repo following [these instructions](https://dev.to/ivana_croxcatto/hiding-api-keys-in-your-code-1h0a) and add the .env file to your .gitignore file so that your keys are never made publicly accessible. The GitHub key should be stored in the .env file as `REACT_APP_GH_KEY` and the OpenCage key should be stored in the file as `REACT_APP_GEO_KEY`. e.g. `REACT_APP_GEO_KEY=key`
- run `npm start` to run the React App in your browser

OR

We have deployed the App using Heroku. To visit, click one of the link below!
- [Heroku](https://githubgarden.herokuapp.com/visualizations/CJSpohn)


### Testing

We used Cypress.js to implement end-to-end-tests of the user flow. To run these tests, `cd` into the project repository and install Cypress by typing `npm i -D cypress` on the command line and adding 
```
"scripts": {
    "cypress:open": "cypress open"
  }
  ```
 to your `package.json` file.

 Then run `npm run cypress:open`

 Cypress.js should open a window with a list of test files. Click on a file name to run the tests in that file.
 Note that the Cypress tests are built to run locally, so you must follow the instructions for setting up the project locally in order for the tests to pass.

[Back to Top of Page](#table-of-contents)

---

## Using GitHub Garden


### Viewing Global GitHub Activity
The site loads to the homepage, displaying a searchbar for GitHub users and a globe icon. To see real time GitHub events light up on a map, click the globe icon. The map will play the 100 most recent GitHub events (those that have location data) and then stop. To see the map display again, refresh the page and click once more on the globe icon.

![Screen Recording 2021-03-02 at 7 45 24 PM (1)](https://user-images.githubusercontent.com/69563078/109745605-5fa42780-7b91-11eb-9d60-0fdcb53684aa.gif)

### Searching for a User Profile
To search for a GitHub user, type their username (this is case sensitive!) into the searchbar at the top of the homepage. 

![Screen Recording 2021-03-02 at 7 50 27 PM](https://user-images.githubusercontent.com/69563078/109745625-65017200-7b91-11eb-8d88-b8c7016a6f32.gif)

While the searched user's information loads, a watering can animation will appear. If GitHub lacks data for the user (e.g. if the username is not an actual GitHub username, if the user has no public repositories), an error message will appear. 

If GitHub has public data for the user, a scrollable garden of flowers will appear.

![flowerbox](https://user-images.githubusercontent.com/69563078/109746873-587e1900-7b93-11eb-8f01-966754954d99.gif)

### Understanding the Visualization
The garden visualization of a user displays one flower for every public repository that the user owns and has contributed to. 

**Flower petals** are scaled according to the total volume of code in a repository and each layer of petals represents a top language in the repository (up to three). The layers are colored according to the languages that they represent.

**Flower stems** are scaled according to active life of the repository, where active life is the time between the repository's creation date and it's most recent update. Repository names are displayed alongside each stem.

**Flower roots** represent repository branches, where 1 branch = 1 stem.

The site includes more information about each component in a key at the bottom of the page. The color key is always visible, and when hovered over, reveals a flower key with annotations that appear upon clicking different parts of the flower.

![Screen Recording 2021-03-02 at 7 53 06 PM (1)](https://user-images.githubusercontent.com/69563078/109745640-6894f900-7b91-11eb-93d4-87c0506f9d00.gif)


[Back to Top of Page](#table-of-contents)

---

### Notes and Plans for Future Iterations
- **Accessibility:** In this iteration, the garden visualization itself is far from accessible to users with visual impairments. Future iterations will include more robust textual annotation so that screenreaders or those with color blindness can access all of the information attached to each flower.
- **Further exploration of GitHub User data:** Many aspects of GitHub repositories have yet to be represented in our "gardens". These include detailed commit data and information about user workflows (PR reviews, issues).
- **API keys:** Future iterations of the project may seek access to the GitHub API at a higher volume. With personal access tokens only, the app cannot sustain very much user traffic.


[Back to Top of Page](#table-of-contents)

