const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/passport')
const session = require('express-session')
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(session({


    secret: "love the way u lie.",
    resave: false,
    saveUninitialized: false,

}))

app.use(passport.initialize());
app.use(passport.session())

mongoose.connect('mongodb://localhost:27017/passportAgainDB')





app.get('/', (req, res) => {


    res.render('home')
})

app.get('/register', (req, res) => {

    res.render('register')
})

app.get('/login', (req, res) => {


    res.render('login')

})

app.get('/secrets', (req, res) => {

    if (req.isAuthenticated()) {

        res.render('secrets')
    } else {

        res.redirect('/login')

    }



})


app.post('/register', (req, res) => {

    User.register({
        username: req.body.username
    }, req.body.password, (err, user) => {

        if (err) {

            console.log(err);
            res.redirect('/register')
        } else {


            passport.authenticate('local')(req, res, () => {

                res.redirect('/secrets')

            })
        }
    })


})

app.post('/login', (req, res) => {

    const user = new User({

        username: req.body.username,
        password: req.body.password,

    })

    req.login(user, (err) => {

        if (err) {

            console.log(err)
        } else {

            passport.authenticate('local')(req, res, () => {

                res.redirect('/secrets')

            })

        }
    })




})

app.get('/logout', (req, res) => {


    req.logout(err => {

        err ? console.log(err) : res.redirect('/')
    })

})

app.listen(3000, () => {


    console.log(`servcer started on port 30000`);
})