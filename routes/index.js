const express = require('express');
const router = express.Router();

const gql = require('graphql-tag');
const apolloClient = require('../apolloClient');

/* GET home page. */
router.get('/', async function (_req, res, _next) {
  const result = await apolloClient.query({
    query: gql`
    {
      itemsByType(type: "article", limit: 3, depth: 0, order: "elements.post_date") {
        ... on ArticleContentType {
          title {
            value
          }
          summary {
            value
          }
          teaser_image {
            assets {
              name
              url
            }
          }
        }
      }
    } 
    `
  });
  res.render('index', { articles: result.data.itemsByType });
});

module.exports = router;
