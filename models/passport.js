const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const passportSchema = new mongoose.Schema({


    email: String,
    password: String,


})

passportSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", passportSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


module.exports = User;