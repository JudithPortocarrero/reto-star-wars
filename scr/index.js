const { get } = require("./utils/axios");

module.exports.handler = async (event) => {
    const data = await get('');

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
};
  