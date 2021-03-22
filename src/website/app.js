require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;

module.exports.load = client => {
    
    app.engine("html", require("ejs").renderFile);
    app.set('view-engine', 'ejs');
    app.use(express.static(path.join(__dirname, "/website")));
    app.use(express.static(path.join(__dirname, "/public")));
    app.set("views", path.join(__dirname, "views"));
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    
    app.use(function(req, res, next) {
        req.bot = client;
        next();
    });

    app.use(
        session({
            secret: "%#@!@#%",
            resave: false,
            saveUninitialized: false
        })
    );

    app.use('/', require('./routes/index'));
    app.listen(PORT, () => console.log(`Dashboard is now listening at port ${PORT}!`));
}