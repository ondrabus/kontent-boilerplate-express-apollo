# Kontent Boilerplate for Express

[<img align="right" src="/docs/assets/template_thumbnail.png" alt="Boilerplate screenshot" width=350 />](https://kontent-boilerplate-apollo.herokuapp.com)

[![Live demo](https://img.shields.io/badge/-Live%20Demo-brightgreen.svg)](https://kontent-boilerplate-apollo.herokuapp.com/)
[![Stack Overflow](https://img.shields.io/badge/Stack%20Overflow-ASK%20NOW-FE7A16.svg?logo=stackoverflow&logoColor=white)](https://stackoverflow.com/tags/kentico-kontent)

[![Build Status](https://github.com/kentico/kontent-boilerplate-express-apollo/actions/workflows/deploy.yml/badge.svg)](https://github.com/Kentico/kontent-boilerplate-express-apollo/actions/workflows/deploy.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/01dee6f2cdaf57755707/maintainability)](https://codeclimate.com/github/Kentico/kontent-boilerplate-express-apollo/maintainability)

This boilerplate showcases how it is possible to combine the [Node.js](https://nodejs.org/en/) web application framework [Express](https://expressjs.com/) with [GraphQL](https://graphql.org/).

The server converts the [Kontent Delivery REST API](https://docs.kontent.ai/reference/kentico-kontent-apis-overview) that fetches data from [Kontent by Kentico](https://kontent.ai) to [GraphQL](https://graphql.org/) using the [Apollo framework](https://www.apollographql.com/) and then renders the output using the [Pug view engine](https://pugjs.org/).

## Quick start

### Prerequisites

* [Node.js](https://nodejs.org/en/download/)
* (Optional) [Visual Studio Code](https://code.visualstudio.com/)

### Run locally

1. Clone the repository.
   * `git clone https://github.com/Kentico/kontent-boilerplate-express-apollo.git`
2. Navigate to the repository folder.
   * `cd kontent-boilerplate-express-apollo`
3. Install the dependencies.
   * `npm install`
4. Adjust config.json to point to your localhost
   * `"protocol": "http://",`
   * `"host": "127.0.0.1",`
5. Run the boilerplate.
   * `npm run debug`
6. Open http://localhost:3000 in your browser.

#### Test queries

With your application running, open http://localhost:3000/graphql and enter following query:

```gql
{
  itemsByType(
    type: "article"
    limit: 3
    depth: 0
    order: "elements.post_date"
  ) {
    ... on ArticleContentType {
      title {
        value
      }
      summary {
        value
      }
      teaser_image {
        value {
          name
          url
        }
       }
      related_articles{
        value{
    ... on ArticleContentType {
      title{
        value
      }
     }
    }
   }
  }
 }
}
```

For more complex queries, take a look at the schema definition generated by Apollo.
<img alt="Shema in playground" src="/docs/assets/schema.png" width="300">

## Other commands

### Debug logging

To run the application with debug logging:
```
npm run debug
```

* It is possible to use the [Debug server](https://github.com/Kentico/kontent-boilerplate-express-apollo/blob/master/.vscode/launch.json#L10) launch configuration if you are using Visual Studio Code for development.

### Regenerate GraphQL schema

Schema is generated using the [Kentico GraphQL schema generator](https://www.npmjs.com/package/@kentico/kontent-schema-generator-graphql) which automatically generates GraphQL data type schema based on the Kontent Project ID.

To regenerate the schema, manually run:
```
npm run generate-schema
```

## How to change Kontent Project ID

* Change the `projectId` argument value in the scripts section found in [package.json](https://github.com/Kentico/kontent-boilerplate-express-apollo/blob/master/package.json#L8)
    * This value is used when the schema is regenerated. Basically, when the application is starting or when the generation is [triggered manually](#Regenerate-GraphQL-schema)
* Change the of `projectId` property in [config.json](https://github.com/Kentico/kontent-boilerplate-express-apollo/blob/master/config.json)
   * This value is used in the application

## How to adjust the boilerplate for different projects

### Architecture

GraphQL endpoints are provided by the  [Apollo Server](https://www.apollographql.com/docs/apollo-server). Implementation of this server requires providing [data and query schema](https://www.apollographql.com/docs/apollo-server/essentials/schema.html) and query resolvers.

* Data schema is generated using the [Kentico GraphQL schema generator](https://www.npmjs.com/package/kentico-kontent-graphql-schema-generator) with the project ID from [package.json](https://github.com/Kentico/kontent-boilerplate-express-apollo/blob/master/package.json#L8) file and stored in [types.js](https://github.com/Kentico/kontent-boilerplate-express-apollo/blob/master/graphQL/types.js) file. This file is generated automatically when the server starts, or [manually](#Regenerate-GraphQL-schema).
* Query type definition and query resolution are stored in the [queries.js](https://github.com/Kentico/kontent-boilerplate-express-apollo/blob/master/graphQL/queries.js) file.

Data provided by the GraphQL endpoint is consumed in [the controller](https://github.com/Kentico/kontent-boilerplate-express-apollo/blob/master/routes/index.js#L9) using the [Apollo client](https://www.apollographql.com/docs/react/) and rendered using the [Pug view engine](https://pugjs.org/).

### Adjusting the boilerplate to your project

1. [Point the application](#How-to-adjust-the-boilerplate-for-different-projects) to your project ID.
2. [Regenerate the schema](#Regenerate-GraphQL-schema) manually.
3. [Define the queries type](https://github.com/Kentico/kontent-boilerplate-express-apollo/blob/master/graphQL/queries.js#L5) schema in `queryTypes` constant.
4. [Implement the queries](https://github.com/Kentico/kontent-boilerplate-express-apollo/blob/master/graphQL/queries.js#L24) by the schema in Query property in resolvers constant.
5. Use the queries to load data to [render in controller](https://github.com/Kentico/kontent-boilerplate-express-apollo/blob/master/routes/index.js).
6. [Adjust the view template](https://github.com/Kentico/kontent-boilerplate-express-apollo/blob/master/views/index.pug) to display provided data.

## Release info

Deployment to Heroku configured on Heroku.
Credentials to Heroku instance are stored on Kentico Secret server.
