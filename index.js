const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const User = require('./models/User');
const Profile = require('./models/Profile');
const Image = require('./schema/Image');
const Post = require('./schema/Post');

const connectDB = require('./config/db');
const path = require('path');


const app = express();

connectDB();

// the database
const questions = [];
const profiles = [];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));


const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://yifan.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: '4FlPBQrcHyk295u0RG7Oq1IN5wP1twde',
    issuer: `https://yifan.auth0.com/`,
    algorithms: ['RS256']
  });
  
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/profiles', async (req, res) => {
    try {
      console.log('get profiles');
      const profiles = await Profile.find();
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
	var list = ["item1", "item2", "item3"];
	res.json(list);
	console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
	res.sendFile(path.join(__dirname+'/client/build/cucs.png'));
});

const port = process.env.PORT || 8081;
app.listen(port);

console.log('App is listening on port ' + port);
