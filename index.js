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

  app.get('/api/profiles/:id', async (req, res) => {
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

  app.delete('/api/profiles/:id', checkJwt, async (req, res) => {
    // console.log('delete id',req.params.id);
    // const {title, name, description} = req.body;
    console.log('delete profile with id');
    console.log(req.params.id);
  
    const profile = await Profile.findById(req.params.id);
    
    if (!profile) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // console.log(profile.name.toString());
    // console.log(req.user.name);
  
    // Check user
    if (profile.name.toString() !== req.user.name) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
  
    await profile.remove();
  
    // console.log(questions);
    // questions.remove(req.params.id);
    res.status(200).send();
  });
  
  app.post('/api/profiles', checkJwt, async (req, res) => {
    try {
      // const user = await User.findById(req.user.id).select('-password');
      const {major, name, grade, description} = req.body;
  
      console.log('posts post');
      console.log(req.body);
  
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

  app.get('/api/posts', async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  app.get('/api/posts/:id', async (req, res) => {
    try {
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

  app.post('/api/posts', checkJwt, async (req, res) => {
	try {
	  // const user = await User.findById(req.user.id).select('-password');
	  const {id, title, name, description} = req.body;

	  console.log('posts post');
	  console.log(req.body);

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


app.delete('/api/posts/:id', checkJwt, async (req, res) => {
    // console.log('delete id',req.params.id);
    // const {title, name, description} = req.body;
    console.log('delete id');
    console.log(req.params.id);
  
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    console.log(post.name.toString());
    console.log(req.user.name);
  
    // Check user
    if (post.name.toString() !== req.user.name) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
  
    await post.remove();
  
    // console.log(questions);
    // questions.remove(req.params.id);
    res.status(200).send();
  });

  // insert a new answer to a question
  app.post('/answer/:id', checkJwt, (req, res) => {
    const {answer} = req.body;
  
    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if (question.length > 1) return res.status(500).send();
    if (question.length === 0) return res.status(404).send();
  
    question[0].answers.push({
      answer,
      author: req.user.name,
    });
  
    res.status(200).send();
  });

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
	var list = ["item1", "item2", "item3"];
	res.json(list);
	console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.resolve(__dirname,'client','build','index.html'));
});

const port = process.env.PORT || 8081;
app.listen(port);

console.log('App is listening on port ' + port);
