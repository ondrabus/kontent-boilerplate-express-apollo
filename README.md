# Kentico Cloud Boilerplate for Express
[<img align="right" src="/docs/assets/template.png" alt="Boilerplate screenshot" />](/docs/assets/template.png)

This boilerplate showcase how it is possible to combine [Node.js](https://nodejs.org/en/) web application framework [Express](https://expressjs.com/) with [GraphQL](https://graphql.org/).

Server converts [Kentico Cloud Delivery REST API](https://developer.kenticocloud.com/reference) to the [GraphQL](https://graphql.org/) using [Apollo framework](https://www.apollographql.com/) and render the output using [Pug view engine](https://pugjs.org/).

# Quick start

## Prerequisites
* [Node.js](https://nodejs.org/en/download/)
* (Optional) [Visual Studio Code](https://code.visualstudio.com/)

## Run locally
1. Clone the repository
   * `git clone https://github.com/Kentico/cloud-boilerplate-express-apollo.git`
2. Enter the repository
   * `cd cloud-boilerplate-express-apollo`
3. Install the dependencies
   * `npm install`
4. Run the boilerplate
   * `npm start`
5. Open the browser on http://localhost:3000

# Other commands

## Debug logging

To run the application with debug logging 
```
npm run debug
```

* It is possible to use [Debug server](https://github.com/Kentico/cloud-boilerplate-express-apollo/blob/master/.vscode/launch.json#L10) launch configuration in case of Visual Studio Code is used for development.

## Regenerate GraphQL schema
Schema is generated using the [Kentico GraphQL schema generator](https://www.npmjs.com/package/kentico-cloud-graphql-schema-generator) which automatically generates data types GraphQl schema based on the Kentico Cloud Project ID.

To regenerate the schema manually run
```
npm run generate-schema
```

# How to change Kentico Cloud Project ID 
* Change the `projectId` argument value in scripts section in [package.json](https://github.com/Kentico/cloud-boilerplate-express-apollo/blob/master/package.json#L8)
    * This value is used when the schema is regenerated. Basically when the application is starting or when the generation is [triggered manually](#Regenerate-GraphQL-schema)
* Change the of project ID property in [config.json](https://github.com/Kentico/cloud-boilerplate-express-apollo/blob/master/config.json)
   * This value is used in application

# How to adjust the boilerplate for different project

## Architecture

GraphQL endpoint is provided by the  [Apollo Server](https://www.apollographql.com/docs/apollo-server). Implementation of this server requires providing [data and query schema](https://www.apollographql.com/docs/apollo-server/essentials/schema.html) and query resolvers.

* Data schema is generated using the [Kentico GraphQL schema generator](https://www.npmjs.com/package/kentico-cloud-graphql-schema-generator) with the project ID from [package.json](https://github.com/Kentico/cloud-boilerplate-express-apollo/blob/master/package.json#L8) file and stored in [types.js](https://github.com/Kentico/cloud-boilerplate-express-apollo/blob/master/graphQL/types.js) file. This file is generated automatically when the server is starting, or [manually](#Regenerate-GraphQL-schema).
* Query type definition and query resolution is stored in [queries.js](https://github.com/Kentico/cloud-boilerplate-express-apollo/blob/master/graphQL/queries.js) file.

Data provided by the GraphQL endpoint is consumed in [the controller](https://github.com/Kentico/cloud-boilerplate-express-apollo/blob/master/routes/index.js#L9) using [Apollo client](https://www.apollographql.com/docs/react/) and rendered using [Pug view engine](https://pugjs.org/).

## Adjusting the boilerplate to your project. 
1. Point the application [to your project ID](#How-to-adjust-the-boilerplate-for-different-project).
2. Regenerate the schema [manually](#Regenerate-GraphQL-schema)
3. Define the queries type schema in [queryTypes](https://github.com/Kentico/cloud-boilerplate-express-apollo/blob/master/graphQL/queries.js#L5) constant.
4. Implement the queries by the schema in [Query property in resolvers constant](https://github.com/Kentico/cloud-boilerplate-express-apollo/blob/master/graphQL/queries.js#L24).
5. Use the queries to load data to render in [controller](https://github.com/Kentico/cloud-boilerplate-express-apollo/blob/master/routes/index.js).
6. Adjust the [view template](https://github.com/Kentico/cloud-boilerplate-express-apollo/blob/master/views/index.pug) to display provided data.

![Analytics](https://kentico-ga-beacon.azurewebsites.net/api/UA-69014260-4/Kentico/cloud-boilerplate-express-apollo?pixel)
