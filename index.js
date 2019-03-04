const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

const corsOptions = {
  origin: 'http://electrony.space',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.get('/login', function(req, res) {
var scopes = 'playlist-modify-public playlist-modify-private user-read-recently-played';
res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=token' +
  '&client_id=' + 'CLINET_ID' +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent('http://electrony.space/token '));
});

app.use(function (req, res, next) {
  res.status(404).send({
    error: "There has been a problem!"
  })
});

app.use(function (err, req, res, next) {
  res.status(500).send({
    error: 'There has been a problem!'
  })
});

app.listen(port, () => console.log(`Electrony listening on port ${port}!`));
