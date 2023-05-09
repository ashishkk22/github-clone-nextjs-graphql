const { request } = require("graphql-request");
const { GraphQLClient } = require("graphql-request");
module.exports.githubApi = async (req, res) => {
  const userGithubToken = req.userToken;
  const query = req.body.query;
  const variables = req.body.variables;

  const headers = {
    headers: {
      authorization: userGithubToken,
    },
  };
  const client = new GraphQLClient(
    "https://api.github.com/graphql",
    headers,

    { errorPolicy: "all" }
  );

  try {
    const data = await client.request(query, variables);
    return res.status(200).json({
      data,
    });
  } catch (err) {
    return res.status(500).send({
      errors: err,
    });
  }
};
