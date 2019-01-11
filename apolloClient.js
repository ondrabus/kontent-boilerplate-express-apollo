const { ApolloClient } = require('apollo-client');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { createHttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');

const { protocol, graphQLPath, host } = require('./config');

const uri = `${protocol}${host}${graphQLPath}`;
const link = createHttpLink({ uri, fetch });
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

module.exports = client;