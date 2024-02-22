const express = require('express');
const { credentials } = require('./config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session')

const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');
const genresRouter = require('./routes/genres');
const usersRouter = require('./routes/users');


const app = express()
const port = 3000

var handlebars = require('express-handlebars').create({
    helpers: {
      eq: (v1, v2) => v1 == v2,
      ne: (v1, v2) => v1 != v2,
      lt: (v1, v2) => v1 < v2,
      gt: (v1, v2) => v1 > v2,
      lte: (v1, v2) => v1 <= v2,
      gte: (v1, v2) => v1 >= v2,
      and() {
          return Array.prototype.every.call(arguments, Boolean);
      },
      or() {
          return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
      },
      someId: (arr, id) => arr && arr.some(obj => obj.id == id),
      in: (arr, obj) => arr && arr.some(val => val == obj),
      dateStr: (v) => v && v.toLocaleDateString("en-US")
    }
  });
app.engine('handlebars', handlebars.engine); //registering handlebars with express
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(credentials.cookieSecret));

app.use(expressSession({
    secret: credentials.cookieSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  }));  
// session configuration
//make it possible to use flash messages, and pass them to the view
app.use((req, res, next) => {
    res.locals.flash = req.session.flash
    delete req.session.flash
    next()
  })
// session configuration
//make the current user available in views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser
  next()
})

  
app.use('/', indexRouter);
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);
app.use('/genres', genresRouter);
app.use('/users', usersRouter);

// custom 404 page
app.use((req, res) => {
    res.status(404)
    res.send('<h1>404 - Not Found</h1>')
})

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error')
})
app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))
    