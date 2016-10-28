const _ = require('lodash');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

const getDanSmiths = () => new Promise((resolve, reject) => {
  const dir = `${__dirname}/assets/data`;
  fs.readdir(dir, (err, files) => {
    if (err) {
      return reject(err);
    }
    return resolve(files.map(file => `${dir}/${file}`));
  });
});

app.set('view engine', 'ejs');

app.use(morgan('dev'));

app.get('/', (req, res) => {
  getDanSmiths()
    .then(files => {
      const file = _.sample(files);
      const content = fs.readFileSync(file, {encoding: 'utf8'});
      res.render('index', {
        content
      });
    })
    .catch(err => {
      res.render('index', {content: err});
    });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port: ${server.address().port}`);
});
