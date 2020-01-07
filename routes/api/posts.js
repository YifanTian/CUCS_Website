const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const Post = require('../../schema/Post');
const jwt = require('express-jwt');
const morgan = require('morgan');
const jwksRsa = require('jwks-rsa');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

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


// app.get('/api/posts', async (req, res) => {
//   try {
//     const posts = await Post.find();
//     res.json(posts);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
