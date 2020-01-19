const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const Post = require('../../schema/Post');
const Profile = require('../../models/Profile');
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


router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(profile);

  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', checkJwt, async (req, res) => {

  const profile = await Profile.findById(req.params.id);
  
  if (!profile) {
    return res.status(404).json({ msg: 'Post not found' });
  }

  // Check user
  if (profile.name.toString() !== req.user.name) {
    return res.status(401).json({ msg: 'User not authorized' });
  }

  await profile.remove();

  res.status(200).send();
});

router.post('/', checkJwt, async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).select('-password');
    const {major, name, grade, description} = req.body;
  
    const newProfile = new Profile({
      major:major,
      name:name,
      grade:grade,
      description:description,
      username: req.user.name
    });

    const post = await newProfile.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
