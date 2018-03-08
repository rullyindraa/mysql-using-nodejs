var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var users = require('./routes/users');

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

app.use('/', index);
app.use('/users', users);


function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-');
}

function formatDateForMySQL(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function getStudentGender(rows, studentGender){
  if(studentGender === 'M'){
    gender = 'Male';
  } else {
    gender = 'Female';
  }
  return gender;
}

app.get('/students', function(req, res) {
  var studentList = [];

  // Do the query to get data.
  con.query('SELECT * FROM students', function(err, rows, fields) {
    if (err) {
      res.status(500).json({"status_code": 500,"status_message": "internal server error"});
    } else {
      console.log(rows);

      // Loop check on each row
      for (var i = 0; i < rows.length; i++) {
        var gender = getStudentGender(rows, rows[i].gender);
        var dateOfBirth = formatDate(rows[i].date_of_birth);

        // Create an object to save current row's data
        var student = {
          'student_id':rows[i].student_id,
          'first_name':rows[i].first_name,
          'lastname':rows[i].lastname,
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
    res.render('index', {title: 'Student List', data: studentList});
    }
  });
});

app.get('/input-student', (req, res) => 
    res.render('input-student.pug')
);

app.post('/input-student', function(req, res) {
  var studentList = [];

  var insertStudent = {
    first_name: req.body.first_name,
    lastname: req.body.lastname,
    address: req.body.address,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
    major: req.body.major,
    student_email: req.body.student_email
  };

  // Do the query to insert data.
  con.query('INSERT INTO students set ? ', insertStudent, function(err, rows, fields) {
    if (err) {
      res.status(500).json({"status_code": 500,"status_message": "internal server error"});
    } else {
      console.log(rows);
    }
    res.redirect('/students');
  });
});

app.get('/student/:id', function(req, res){
	con.query('SELECT * FROM students WHERE student_id = ?', [req.params.id], function(err, rows, fields) {
		if(err) throw err
		
		// if user not found
		if (rows.length <= 0) {
				res.redirect('/students')
		} else { 
			var studentDoB = formatDate(rows[0].date_of_birth);
			// if user found
			// render to views/index.pug template file
			res.render('edit-student', {
				//data: rows[0],
				student_id: rows[0].student_id,
        first_name: rows[0].first_name,
        lastname: rows[0].lastname,
        address: rows[0].address,
        date_of_birth: studentDoB,
        gender: rows[0].gender,
        major: rows[0].major,
        student_email: rows[0].student_email
			})
		}            
	});
});

app.post('/edit-student', function(req, res) {
  var student_id = req.body.student_id;
  var first_name = req.body.first_name;
  var lastname = req.body.lastname;
  var address = req.body.address;
  var date_of_birth = formatDateForMySQL(req.body.date_of_birth);
  var gender = req.body.gender;
  var major = req.body.major;
  var student_email = req.body.student_email;

  con.query('UPDATE students SET first_name = ?, lastname = ?, address = ?, date_of_birth = ?, gender = ?, major = ?, student_email = ? WHERE student_id = ?', [first_name, lastname, address, date_of_birth, gender, major, student_email, student_id], function (error, results, fields) {
    if (error) throw error;
    res.redirect('/students');
  });
});

app.get('/delete/:id', function (req, res) {
  con.query('DELETE from students WHERE student_id = ?', [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.redirect('/students');
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
