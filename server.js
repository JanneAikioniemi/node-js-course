const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// MIDDLEWARE
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}: '${req.url}' `;

    console.log(log);
    // fs.appendFile('server.log', log + '\n', (err) => {
    //     if (err) {
    //         console.log('Unable to append to server.log');
    //     }
    // });

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance'
//     });
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});


// ROUTES
app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Home'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});