const express = require('express')
const path = require('path')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' })
      }
      return done(null, user)
    })
  })
)

app.use(cookieParser())
app.set('trust proxy', 1)
app.use(
  session({
    secret: 'mocha cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(express.static(path.join(__dirname, '.', 'public')))

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public', 'index.html'))
})

module.exports = app
