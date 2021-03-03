const pvAPI = {
  fetchGitHubData: async (url) => {
    const result = await fetch(url, {
      headers: {
        authorization: `token ${process.env.REACT_APP_GH_KEY}`
      }
    })
    return result;
  },

}

export default pvAPI;
