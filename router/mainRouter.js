var express = require('express');
var router = express.Router();
var search = require('../search/search')

/* GET home page. */
router.get('/', function (req, res, next) {
  var products = search.getAllProducts();
  res.render('index', {
    page: 'Home',
    menuId: 'home'
  });
});



module.exports = router;