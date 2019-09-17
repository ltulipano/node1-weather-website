const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000

// Define path for express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.get will render (see below code) /index.html - special meaning to a server
// app.get('/', (req, res) => {
//     res.send('');
// });
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Len the learner',
        description: 'My very first weather application.'
    });
});

// app.com/about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Len Tulipano',
        description: 'My very first weather application.'
    });
});

// app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Len Tulipano',
        description: 'This is what I am all about.  Degtermined to learn nodejs.'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send( {
            error: 'You must provide an address!'
        });   
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send ({ error: error })    
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});    

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send( {
            error: 'You must provide a search term!'
        });   
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
}); 

app.get('/help/*', (req, res) => {
    res.render('error', {
    title: 'Error:',
    name: 'Len Tulipano',
    errorMessage: 'Help article not found'    
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Error:',
        name: 'Len Tulipano',
        errorMessage: 'Page not found'    
        });
});

app.listen(port, () => {
    console.log('Server running on port ' + port);
});