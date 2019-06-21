const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
// views engine
app.set('view engine', 'hbs');
// views path, default is /views
app.set('views', viewsPath);
// set up partials
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    // renders one of our views
    res.render('index', {
        title: 'Weather',
        name: 'Geo G'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Geo G'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Geo G',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, { forecast }) => {
            if (error) {
                return res.send({ error });
            }

            return res.send({
                location,
                forecast
            });
        });
    });
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Geo G',
        errorMessage: 'Help article not found'
    });
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Geo G',
        errorMessage: 'Page not found'
    });
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'))
// console.log(__filename);

// app.get('/', (req, res) => {
//     res.send('<h1>Weather</h1>');
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Geo',
//         age: 23
//     }, {
//         name: 'Andrew',
//         age: 27
//     }]);
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>');
// })