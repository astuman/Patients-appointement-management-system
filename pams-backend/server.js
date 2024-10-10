const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require("mongoose")


// //routing
const usersRouter = require('./routes/users/usersAccount');
const employeesRouter = require('./routes/employees/employeesController')
const patientsRouter = require('./routes/patients/patientsController')
// const indexRouter = require('./routes/index');
// const loginRouter = require('./routes/auth/login');
// const logoutRouter = require('./routes/auth/logout')
// // const signupRouter = require('./routes/auth/signup')
// const verifyRouter = require('./routes/auth/verify')



// const resultsRouter = require('./routes/results/resultsController')
// const appointementRouter = require('./routes/appointement/appointementsController')
// const dashboardRouter = require('./routes/dashboard/dashboard')
// const restpassword = require('./routes/auth/resetPassword')



const app = express();
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(cors({
  origion: "http://localhost:9000"
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: ['https://www.section.io', 'https://www.google.com/']
  }));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employees', employeesRouter);
app.use('/patients', patientsRouter);
// app.use('/login', loginRouter);
// app.use('/logout', logoutRouter);
// // app.use('/signup', signupRouter);
// app.use('/verify', verifyRouter);


// app.use('/results', resultsRouter);
// app.use('/appointement', appointementRouter)
// app.use('/dashboard', dashboardRouter);
// app.use('/resetpassword', restpassword);


// const URI = "mongodb://localhost:27017/HMS";
// const conn = mongoose.connect(URI,{})
const conn = mongoose.connect('mongodb://127.0.0.1:27017/pams');
// const connection = mongoose.connection;

if(conn){
  mongoose.connection.once('open', () =>{
    console.log('connetced to database pams')
  })
}else{
  console.log("database not connected")
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;