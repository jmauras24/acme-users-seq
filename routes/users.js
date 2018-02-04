const app = require('express').Router();
const db = require('../db');
const { models } = db;
const { Users } = models;

module.exports = app;

app.get('/',(req, res, next) =>{
  Users.findAll()
    .then( users => res.render('users',{users}))
    .catch(err => next(err))
});

app.post('/',(req, res, next) => {
  console.log("---->",req.body);
  Users.create(req.body)
    .then(user => res.redirect('/users'))
    .catch(err => next(err))
});
