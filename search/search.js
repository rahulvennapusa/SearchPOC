const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
var express = require('express');

module.exports = {


    
   getAllProducts: async function (req,res,next) {

    // res.render('index', {page:'Search', menuId:'Search'});
  
  // Let's search!
  const { body } = await client.search({
    index: 'products',
    body: {
      query: {
        match_all: {
        }
      }
    }
  });
    console.log('LOGGED')
    }
   
};