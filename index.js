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
  
  // retrieve all profiles
  // app.get('/profiles', (req, res) => {
  //   console.log('get profiles');
  //   const qs = profiles.map(q => ({
  //     id: q.id,
  //     major: q.major,
  //     name: q.name,
  //     description: q.description,
  //     grade: q.grade,
  //   }));
  //   res.send(qs);
  // });
  
  // get a specific profile
  // app.get('/profile/:id', (req, res) => {
  //   const profile = profiles.filter(q => (q.id === parseInt(req.params.id)));
  //   if (profile.length > 1) return res.status(500).send();
  //   if (profile.length === 0) return res.status(404).send();
  //   res.send(profile[0]);
  // });
  
  app.get('/profile/:id', async (req, res) => {
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
  
  
  app.delete('/profiles/:id', checkJwt, async (req, res) => {
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
  
  
  app.get('/myprofile', checkJwt, async (req, res) => {
      console.log(req);
      const profile = await Profile.findOne({name: req.user.name});
      if (!profile) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      res.json(profile);
  });
  
  
  // insert a new profile
//   app.post('/profiles', checkJwt, (req, res) => {
//     const {major, name, grade, description} = req.body;
//     console.log(major);
//     console.log('post profile: ', name);
//     const newProfile = {
//       id: profiles.length + 1,
//       major,
//       name,
//       grade,
//       description,
//       username: req.user.name,
//     };
//     profiles.push(newProfile);
//     res.status(200).send();
//   });
  
  
  app.post('/profiles', checkJwt, async (req, res) => {
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
  
  app.get('/profiles', async (req, res) => {
    try {
      console.log('get profiles');
      const profiles = await Profile.find();
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  
  // app.get('/profiles', async (req, res) => {
  //   console.log('try get profile with picture at server');
  //   try {
  //     // const profiles = await Profile.find().populate('user', ['name', 'avatar','username']);
  //     // const profiles = await Profile.find().populate('user', ['name', 'avatar']).populate('img', ['data', 'contentType']);
  //     // const profiles = await Profile.find().populate('user', ['name', 'avatar']);
  //     const images = await Image.find();
  //     console.log('images: ',images);
  //     const profiles = await Profile.find().populate('Image', ['userName','img']).populate('user', ['name', 'avatar']);
  //     console.log('profiles: ',images);
  
  //     var dict = new Object();
  //     for(const i of Array(images.length).keys()) {
  //       dict[images[i].userName] = images[i]
  //     }
  
  //     for(const i of Array(profiles.length).keys()) {
  //       if (profiles[i].user._id in dict) {
  //         profiles[i].Image = dict[profiles[i].user._id]
  //       } 
  //     }
  
  //     res.json(profiles);
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send('Server Error');
  //   }
  // });
  
  
  
//   // retrieve all questions
//   app.get('/', (req, res) => {
//     console.log('get questions');
//     console.log(questions);
//     const qs = questions.map(q => ({
//       id: q.id,
//       title: q.title,
//       name: q.name,
//       description: q.description,
//       answers: q.answers.length,
//       author: q.author
//     }));
//     res.send(qs);
//   });
  
  app.get('/posts', async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  app.get('/posts/:id', async (req, res) => {
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
  
  
  // get a specific question
  app.get('/:id', (req, res) => {
    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if (question.length > 1) return res.status(500).send();
    if (question.length === 0) return res.status(404).send();
    res.send(question[0]);
  });
  
  
  // insert a new question
  // app.post('/', checkJwt, (req, res) => {
  //   const {title, name, description} = req.body;
  //   console.log(title);
  //   console.log(name);
  //   const newQuestion = {
  //     id: questions.length + 1,
  //     title,
  //     name,
  //     description,
  //     answers: [],
  //     author: req.user.name,
  //   };
  //   questions.push(newQuestion);
  //   res.status(200).send();
  // });
  
  app.post('/posts', checkJwt, async (req, res) => {
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
  
  app.delete('/posts/:id', checkJwt, async (req, res) => {
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
  

// //Init middleware
// app.use(express.json({ extended: false }));
// //Routes
// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/profile', require('./routes/api/profile'));
// app.use('/api/posts', require('./routes/api/posts'));
// app.use('/api/auth', require('./routes/api/auth'));

// Serve static in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const PORT =  process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
