var express = require('express');
var router = express.Router();
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })


/* GET Search page. */

router.post('/search', function (req, res, next) {
  res.render('index', { page: 'Search', menuId: 'Search' });
});
router.get('/', async function (req, res, next) {
  // res.render('index', {page:'Search', menuId:'Search'});
  const response = {
    searhTerm: req.query.q
  };
  console.log(response);
  //res.send(response);

  // Let's search!
  const { body } = await client.search({
    index: 'product',
    body: {
      query: {
        multi_match: {
          query: req.query.q,
          fields: ["DisplayName", "Category"]
        }
      },
      aggs: {
        category: {
          terms: {
            field: "Category",
            size: 100
          }
        }
      }
    }
  });

 //console.log(body.hits.hits);
  res.render('search', { page: 'Search', menuId: 'Search', data: body.hits.hits, categories: body.aggregations.category.buckets, resultCount: body.hits.total.value});
});


module.exports = router; 