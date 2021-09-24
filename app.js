const express = require('express')
const app = express();
require('dotenv/config');

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// Imported Routes
const userRoutes = require('./router/users');
const addonRoutes = require('./router/addons');
const categories = require('./router/categories');
const products = require('./router/products');
const history = require('./router/history');
const customer = require('./router/customer');

// Middlewre
app.use('/users', userRoutes);
app.use('/addons', addonRoutes);
app.use('/categories', categories);
app.use('/products', products);
app.use('/history', history);
app.use('/customer', customer);

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.status(404).send({
        message: '404 Error page'
    });
  });
// Routes
app.get('/', (req, res) => {
    res.send('We are on home')
})
//Listen to the server
app.listen(process.env.PORT);

