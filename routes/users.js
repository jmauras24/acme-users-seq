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
  console.log("---->",req.body, req.body.name.trim().length);
  if(req.body.name.trim().length === 0) res.render('error')
  Users.create(req.body)
    .then(user => res.redirect('/users'))
    .catch(err => next(err))
});

app.delete('/:id',(req, res, next) =>{
  Users.findById(req.params.id)
    .then(user => user.destroy())
    .then(() => res.redirect('/users'))
    .catch(err => next(err))
});
