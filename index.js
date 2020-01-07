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

app.use(express.json({ extended: false }));

app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profiles', require('./routes/api/profile'));

// Serve static in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const PORT =  process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
