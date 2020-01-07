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

router.get('/:id', async (req, res) => {
  try {
    console.log('req.params.id: ',req.params.id);
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);

  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.post('/', checkJwt, async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).select('-password');
    const {id, title, name, description} = req.body;

    const newPost = new Post({
    title: title,
    name: name,
    description: description,
    answers: [],
    author: req.user.name,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', checkJwt, async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    return res.status(404).json({ msg: 'Post not found' });
  }

  // Check user
  if (post.name.toString() !== req.user.name) {
    return res.status(401).json({ msg: 'User not authorized' });
  }

  await post.remove();

  // questions.remove(req.params.id);
  res.status(200).send();
});

// insert a new answer to a question
router.post('/answer/:id', checkJwt, async (req, res) => {
  const {answer} = req.body;
  console.log('answer: ',answer);
  console.log('req.params.id: ',req.params);

  // const post = await Post.findById(req.params.id);
    // const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    // post[0].answers.push({
    //   answer,
    //   author: req.user.name,
  // });

  try {
    // const profile = await Profile.findOne({ user: req.user.id });
    const post = await Post.findById(req.params.id);
    
    if (post.length > 1) return res.status(500).send();
    if (post.length === 0) return res.status(404).send();
    
    console.log('shift answer: ',answer);
    post.answers.unshift({answer, author: req.user.name,});
    await post.save();

    res.json(post);
    } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    }
  res.status(200).send();
});


module.exports = router;
