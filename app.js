const express = require('express')
const app = express();

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// Imported Routes
const postRoutes = require('./router/posts');
const userRoutes = require('./router/users');

// Middlewre
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

// Routes
app.get('/', (req, res) => {
    res.send('We are on home')
})
//Listen to the server
app.listen(3000);

