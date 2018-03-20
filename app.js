var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var crypto = require('crypto');
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;
var nodemailer = require('nodemailer');
var async = require('async');
var session = require('express-session');
var Store = require('express-session').Store;
var BetterMemoryStore = require('session-memory-store')(session);
var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true});
var alertNode = require('alert-node');
var jwt = require('jsonwebtoken');
var moment = require('moment');
moment().format();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
var app = express();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "students"
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

app.use(session( {
  name: 'JSESSION',
  secret: 'MYSECRETISVERYSECRET',
  store: store,
  resave: true,
  saveUninitialized: true
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new passportLocal( {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true //passback entire req to callback
}, function (req, username, password, done) {
  if (!username || !password) {
    return done(null, false, req.flash('message', 'All fields are required.'));
  }
  var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
  con.query('select * from users where username = ?', [username], function(err, rows) {
    console.log(err);
    console.log(rows);
    if (err) return done(req.flash('message', err));
    if (!rows.length) {
      return done (null, false, req.flash('message', 'Invalid username or password'));
    }
    salt = salt+''+password;
    var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
    var dbPassword = rows[0].password;
    if (!(dbPassword == encPassword)) {
      return done (null, false, req.flash('message', 'Invalid username or password.'));
    }
    return done (null, rows[0]);
  });
}));

passport.serializeUser(function(user, done) {
  done (null, user.id);
});

passport.deserializeUser(function(id, done) {
  con.query('select * from users where id ='+ id, function(err, rows){
    done(err, rows[0]);
  });
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}

app.get('/', function(req, res) {
  if (req.isAuthenticated()) {
    res.render('index');
  } else {
    res.render('login');
  }
});

app.get('/login', function(req, res) {
  res.render('login', {'message' : req.flash('message')});
});

app.post('/login', passport.authenticate('local', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}), function(req, res, info) {
  res.render('login', {'message' : req.flash('message')});
});

app.get('/add-user', isAuthenticated, function(req, res) {
  res.render('add-user', {'message' : req.flash('message')});
});

app.post('/add-user', isAuthenticated, function(req, res) {
  var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
  var password = req.body.password;
  var pass = salt+''+password;
  var username = req.body.username;
  var email = req.body.email;
  var insertUsers = {
    username: req.body.username,
    email: req.body.email,
    password: crypto.createHash('sha1').update(pass).digest('hex')
  };
  con.query('select * from users where username = ? OR email = ?', [username, email], function(err, rows, fields) {
    if (err) {
    console.log(err);
    } else if (rows.length > 0) {
      alertNode('You entered duplicate username or email!');
    } else {
      con.query('INSERT INTO users set ? ', insertUsers, function(err, rows, fields) {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
        }
        res.redirect('/');
      });
    }
  });
});

app.get('/forgot', isAuthenticated, function(req, res) {
  res.render('forgot');
});

app.post('/forgot', isAuthenticated, function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        console.log(token);
        done(err, token);
      });
    },
    function(token, done) {
      var email = req.body.email;
      con.query('select * from users where email = ?', [email], function(err, rows) {
        console.log(err);
        if (!rows.length) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        } else {
          var email = req.body.email;
          var pwdToken = token;
          console.log(token);
          var pwdExp = new moment().add(10, 'm').toDate();
          console.log(pwdExp);
          
          con.query('UPDATE users set resetPasswordToken = ?, resetPasswordExpires = ? WHERE email = ?', [pwdToken, pwdExp, email], function(err, rows) {
            done(err, token, rows);
            console.log(rows);
          });
        }
      });
    },
    function(token, rows, done) {
      const msg = {
        to: [req.body.email],
        from: 'passwordreset@student.com',
        subject: 'Student Database Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.<br><br>' +
        'Please click on the following link, or paste this into your browser to complete the process:<br><br>' +
        'http://' + req.headers.host + '/reset/' + token + '<br><br>' +
        'If you did not request this, please ignore this email and your password will remain unchanged.<br>',
      };
      sgMail.send(msg, function(err) {
        req.flash('info', 'An email has been sent to ' + req.body.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

app.get('/reset/:token', function(req, res) {
  con.query('SELECT * FROM users WHERE resetPasswordToken = ?', [req.params.token], function(err, rows) {
    if (rows.length <= 0) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset');
  });
});

app.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      con.query('SELECT * FROM users WHERE resetPasswordToken = ?', [req.params.token], function(err, rows) {
        console.log(rows);
        if (!rows.length > 0) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('/forgot');
        }
        var email = rows[0].email;
        var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
        var password = req.body.password;
        var pass = salt+''+password;
        var pwd = crypto.createHash('sha1').update(pass).digest('hex')
        var resetPasswordToken = undefined;
        var resetPasswordExpires = null;

        con.query('UPDATE users set password = ?, resetPasswordToken = ?, resetPasswordExpires = ? WHERE email = ?', [pwd, resetPasswordToken, resetPasswordExpires, email], function(err) {
          if(err) {
            throw err;
          } else {
            req.flash('success', 'Success! Your password has been changed.');
          }
          console.log(rows);
        });

        con.query("select * from users where email = '"+rows[0].email+"'", function(err, rows) {
          done(err, rows);
        });
      });
    },
    function(rows, done) {
      const msgReset = {
        to: [req.body.email],
        from: 'passwordreset@student.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + req.body.email + ' has just been changed.\n',
        html: 'Hello,<br><br>' +
        'This is a confirmation that the password for your account ' + req.body.email + ' has just been changed.<br>',
      };
      sgMail.send(msgReset, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err, 'done');
      });
    }
  ], function(err) {
    console.log(err);
    res.redirect('/reset');
  })
})

app.get('/logout', function(req, res) {
  if(!req.isAuthenticated()) {
    notFound404(req, res, next);
  } else {
    req.logout();
    res.redirect('/login');
  }
});

function formatDateForMySQL(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function getStudentGender(rows, studentGender) {
  if(studentGender === 'M') {
    gender = 'Male';
  } else {
    gender = 'Female';
  }
  return gender;
}

app.get('/students', isAuthenticated, function(req, res) {
  var studentList = [];

  // Do the query to get data.
  con.query('SELECT * FROM students', function(err, rows, fields) {
    if (err) {
      res.status(500).json({"status_code": 500,"status_message": "internal server error"});
    } else {
      //console.log(rows);
      // Loop check on each row
      for (var i = 0; i < rows.length; i++) {
        var gender = getStudentGender(rows, rows[i].gender);
        var dateOfBirth = formatDateForMySQL(rows[i].date_of_birth);
        var admission_date = formatDateForMySQL(rows[i].admission_date);

        // Create an object to save current row's data
        var student = {
          'id': rows[i].id,
          'student_id':rows[i].student_id,
          'admission_date':admission_date,
          'name':rows[i].name,
          'address':rows[i].address,
          'date_of_birth':dateOfBirth,
          'gender':gender,
          'major':rows[i].major,
          'student_email':rows[i].student_email
          
        }
        // Add object into array
        studentList.push(student);
    }

    // Render index.pug page using array 
    res.render('student-list', {title: 'Student List', data: studentList});
    }
  });
});

function gChartTranspose(original) {
  var transpose = [];
  for (var i = 0; i < original.length; ++i) {
    for (var j = 0; j < original[i].length; ++j) {
      if (original[i][j] === undefined) {
        continue;
      }
      if (transpose[j] === undefined) {
        transpose[j] = [];
      }
      transpose[j][i] = original[i][j];
    }
  }
  return transpose;
}

app.get('/statistics', isAuthenticated, function(req, res) {
  var tempMonthTotal = []; transMonth = []; getGender = []; getGenderCount = []; tempGenderCount = []; transGend = [];
  var q = 'select gender, count(gender) as gender_count from students group by gender';
  //console.log(q);
  con.query(q, function(err, rows, fields) {
    if (err) {
      console.log(err)
    } else {
    getGender.push('gender')
    getGenderCount.push('gender_count')
      for (var j = 0; j < rows.length; j++) {
        if (rows[j].gender === 'F') {
          getGender.push('Female')
        } else {
          getGender.push('Male')
        }
        getGenderCount.push(rows[j].gender_count)
      }
      tempGenderCount.push(getGender, getGenderCount)
    }
    var transGend = gChartTranspose(tempGenderCount);
    console.log(transGend);
    var getMonth = ['month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; 
    var getTotal = ['Total', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
    //var year = req.body.year;
    var q = 'select month(admission_date) as month, count(id) as Total from students where year(admission_date) = '+[req.query.year]+' group by month(admission_date)';
    console.log(q);
    con.query(q, function(err, rows, fields) {
      //console.log(rows);
      if (err) {
        console.log(err)
      } else {
        for (var j = 0; j < rows.length; j++) {
          var month = rows[j].month;
          getTotal.fill(rows[j].Total, month, month+1)
        } 
        //console.log(getMonth);
        //console.log(getTotal);
        tempMonthTotal.push(getMonth, getTotal) 
      }
      var transMonth = gChartTranspose(tempMonthTotal);
      console.log(transMonth);
      res.render('statistics', { obj1: JSON.stringify(transGend), obj2: JSON.stringify(transMonth) });
    })
  });
});

app.get('/input-student', isAuthenticated, (req, res) => 
    res.render('input-student.pug')
);

app.post('/input-student', isAuthenticated, function(req, res) {
  var studentList = [];

  var insertStudent = {
    student_id: req.body.student_id,
    admission_date: req.body.admission_date,
    name: req.body.name,
    address: req.body.address,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
    major: req.body.major,
    student_email: req.body.student_email
  };

  var student_id = req.body.student_id;
  var date_of_birth = req.body.date_of_birth;
  var today = new Date();
  var newtoday = formatDateForMySQL(today);
  
  con.query('select * from students where student_id = ?', student_id, function(err, rows, fields) {
    if (err) {
    console.log(err);
    } else if (rows.length > 0) {
      alertNode('You entered duplicate Student ID!');
    } else if (date_of_birth > newtoday) {
      alertNode("You can't enter date of birth in future!");
    } else {
      // Do the query to insert data.
      con.query('INSERT INTO students set ? ', insertStudent, function(err, rows, fields) {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
        }
        res.redirect('/students');
      });
    }
  });
});

app.get('/:id', isAuthenticated, function(req, res) {
  con.query('SELECT * FROM students WHERE student_id = ?', [req.params.id], function(err, rows, fields) {
    if (err) throw err;
		if (rows.length <= 0) {
      res.redirect('/students')
    } else { 
      var student_admission_date = formatDateForMySQL(rows[0].admission_date);
      var studentDoB = formatDateForMySQL(rows[0].date_of_birth);
      res.render('edit-student', {
        id: rows[0].id,
        student_id: rows[0].student_id,
        admission_date: student_admission_date,
        name: rows[0].name,
        address: rows[0].address,
        date_of_birth: studentDoB,
        gender: rows[0].gender,
        major: rows[0].major,
        student_email: rows[0].student_email
      })
    }
  });
});

app.post('/edit-student', isAuthenticated, function(req, res) {
  var id = req.body.id;
  var student_id = req.body.student_id;
  var admission_date = formatDateForMySQL(req.body.admission_date);
  var name = req.body.name;
  var address = req.body.address;
  var date_of_birth = formatDateForMySQL(req.body.date_of_birth);
  var gender = req.body.gender;
  var major = req.body.major;
  var student_email = req.body.student_email;

  var today = new Date();
  var newtoday = formatDateForMySQL(today);
  if (date_of_birth < newtoday) {
    con.query('UPDATE students SET id = ?, admission_date = ?, name = ?, address = ?, date_of_birth = ?, gender = ?, major = ?, student_email = ? WHERE student_id = ?', [id, admission_date, name, address, date_of_birth, gender, major, student_email, student_id], function (error, results, fields) {
      if (error) throw error;
      res.redirect('/students');
    });
  } else {
    alertNode("You can't enter date of birth in future!");
  }
});

app.get('/delete/:id', isAuthenticated, function (req, res) {
  con.query('DELETE from students WHERE student_id = ?', [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.redirect('/students');
  });
});

app.post('/filter', isAuthenticated, function(req, res) {
  var studentList = [];
  var keywords = req.body.keywords;
  var orderby = req.body.orderby;
  var sort = req.body.sort;

  console.log(orderby);
  // Do the query to get data.
  con.query('SELECT * FROM students where '+orderby+' like \'%'+keywords+'%\' order by '+orderby+' '+sort+'', function(err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);

      // Loop check on each row
      for (var i = 0; i < rows.length; i++) {
        var gender = getStudentGender(rows, rows[i].gender);
        var dateOfBirth = formatDateForMySQL(rows[i].date_of_birth);
        var student_admission_date = formatDateForMySQL(rows[0].admission_date);

        // Create an object to save current row's data
        var student = {
          'id':rows[i].id,
          'student_id':rows[i].student_id,
          'admission_date':student_admission_date,
          'name':rows[i].name,
          'address':rows[i].address,
          'date_of_birth':dateOfBirth,
          'gender':gender,
          'major':rows[i].major,
          'student_email':rows[i].student_email
        }
        // Add object into array
        studentList.push(student);
    }
    // Render index.pug page using array 
    res.render('student-list', {title: 'Student List', data: studentList});
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
