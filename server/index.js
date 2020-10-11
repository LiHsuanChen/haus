const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 2020;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Dao = require('./dao');

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://159.89.86.142'
}));

passport.use(new LocalStrategy(
  (email, password, cb) => {
    Dao.verifyUser(email, password).then((user) => {
      if(user){
        return cb(null, user);
      }
      return cb(new Error("verify failed"));
    });
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user.email);
});

passport.deserializeUser((email, cb) => {
  Dao.getUser(email).then((user) => {
    if(user){
      return cb(null, user);
    }
    return cb(new Error("verify failed"));
  });
});

app.use(require('express-session')({ secret: 'haus exercise', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    console.log(user);
    if (err || !user) { 
      return res.json({ success: false, message: "invlaid" }); 
    }
    req.logIn(user, function(err) {
      if (err) { 
        return res.json({ success: false, message: "invlaid" }); 
      }
      return res.json({ success: true, data: { email: user.email }});
    });
  })(req, res, next);
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/session', ensureAuthenticated, async function (req, res) {
  return res.json({ success: true, data: req.user });
});

app.get('/feedback', ensureAuthenticated, async function (req, res) {
  const allFeedback = await Dao.getAllFeedback(req.user.id);
  return res.json({ success: true, data: allFeedback });
});

app.post('/feedback', ensureAuthenticated, async function (req, res) {
  const feedback = req.body.feedback;
  const result = await Dao.createFeedback(feedback, req.user.id);
  return res.json({ success: true, message: "feedback created" });
});

app.post('/verify', async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const user = await Dao.verifyUser(email, password);
});

app.post('/register', async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const user = await Dao.getUser(email);
  if(user){
    return res.json({ success: false, message: "user existed" });
  }
  const newUser = await Dao.createUser(email, password);
  return res.json({ success: true, message: "user created" });
});

app.listen(port, function () {
  console.log('express server has started...');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ success: false, message: "unauthorized" });
}
