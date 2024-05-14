const axios = require("axios");

const get = async (path) => {

  const response = await axios.get(`https://swapi.py4e.com/api/${path}`
  );
  const data = response.data;
  return data;
};

module.exports = { get };
