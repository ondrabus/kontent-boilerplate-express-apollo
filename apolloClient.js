const { ApolloClient } = require('apollo-client');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { createHttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');

const { port, graphQLPath, host } = require('./config');

const uri = process.env.NODE_ENV === 'production'? graphQLPath : `http://${host}:${process.env.PORT || port}${graphQLPath}`;
const link = createHttpLink({uri, fetch });
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

module.exports = client;