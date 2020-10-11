const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.port;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Dao = require('./dao');
const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://159.89.86.142:3000'];

app.use(cors({
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
    } else {
        callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
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

app.get('/logout', function(req, res){
  req.logout();
  res.json({ success: true, message: "logged out" });
});

app.get('/session', ensureAuthenticated, async function (req, res) {
  return res.json({ success: true, data: req.user.id });
});

app.get('/feedback', ensureAuthenticated, async function (req, res) {
  const allFeedback = await Dao.getAllFeedback(req.user.id);
  return res.json({ success: true, data: allFeedback });
});

app.post('/feedback', ensureAuthenticated, async function (req, res) {
  const feedback = req.body.feedback;
  await Dao.createFeedback(feedback, req.user.id);
  Dao.slackWebhookSend(feedback, req.user.email);
  return res.json({ success: true, message: "feedback created" });
});

app.post('/verify', async function (req, res) {
  const user = await Dao.verifyUser(req.body.email, req.body.password);
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
