const express = require('express');
const nunjucks = require('nunjucks');
nunjucks.configure({noCache: true});
const app = express();
app.use(require('method-override')('_method'));
app.use(require('body-parser').urlencoded());
const path = require('path');

app.set('view engine','html');
app.engine('html',nunjucks.render);

app.use('/vendor',express.static(path.join(__dirname,'node_modules')));

const db = require('./db');
const Users = db.models.Users;

const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
  res.render('index')
});
app.use('/users', require('./routes/users'))



app.listen(port,() =>
  console.log(`Listening on port ${port}`)
);

db.sync()
  .then(() =>
    db.seed());
