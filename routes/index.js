const express = require('express');
const router = express.Router();

const gql = require('graphql-tag');
const apolloClient = require('../apolloClient');
const { graphQLPath } = require('../config');

/* GET home page. */
router.get('/', async function (_req, res, _next) {
  const result = await apolloClient.query({
    query: gql`
    {
      itemsByType(type: "article", limit: 3, depth: 2, order: "elements.post_date") {
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
    `
  });
  res.render('index', {
    articles: result.data.itemsByType,
    playgroundLink: graphQLPath
  });
});

module.exports = router;
