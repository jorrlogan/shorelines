import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import {fileURLToPath} from 'url';
// 👇️ "/home/borislav/Desktop/javascript/index.js"
const __filename = fileURLToPath(import.meta.url);
console.log(__filename)

// 👇️ "/home/borislav/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import clinicRouter from './routes/clinic.js'
import cityRouter from './routes/city.js'

const app = express();

//testing data
app.get("/api", (req, res) => {
  res.json({"users": ["userOne", "userTwo", "userThree"]});
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/clinic', clinicRouter)
app.use('/city', cityRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => { console.log(`Example app listening on port ${3000}`) })

export default app
// module.exports = app;
