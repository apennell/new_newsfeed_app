var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// Refactor connection and query code
var db = require("./models");


app.get('/articles', function(req,res) {
  db.Article.all().then(function(articles) {
    res.render('articles/index', {articlesList: articles});
  });
});


app.get('/articles/new', function(req,res) {
  res.render('articles/new');
});


app.post('/articles', function(req,res) {
  db.Article.create({title: req.body.title, author: req.body.author, content: req.body.content})
  	.then(function(articles) {
  		res.redirect('/articles');
  	});
});


app.get('/articles/:id', function(req, res) {
 var articleId = req.params.id;

 db.Article.find(articleId)
     .then(function(article) {
       res.render('articles/article', {articleToDisplay: article});
     });
});


app.get('/', function(req,res) {
  res.render('site/index.ejs');
});


app.get('/about', function(req,res) {
  res.render('site/about');
});


app.get('/contact', function(req,res) {
  res.render('site/contact');
});


app.listen(3000, function() {
  console.log('Listening');
});
