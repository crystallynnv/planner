// Require modules
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');

require('dotenv').config();

// Create the Express app
const app = express();

// Configure the app (app.set)

// Mount middleware (app.use)

// Mount routes
const indexRouter = require("./routes/index");
const herbsRouter = require("./routes/herbs");
const usersRouter = require('./routes/users');
const remediesRouter = require('./routes/remedies');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'herbz',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/", herbsRouter);
app.use("/users", usersRouter);
app.use("/", remediesRouter);


// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;


// Tell the app to listen on port 3000
app.listen(3000, function(){
    console.log('Listening on port 3000');
});