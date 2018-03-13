var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var validators = require('express-validators');


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
        var dateOfBirth = formatDateForMySQL(rows[i].date_of_birth);
        var admission_date = formatDateForMySQL(rows[i].admission_date);

        // Create an object to save current row's data
        var student = {
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

app.get('/dashboard', (req, res) => 
    res.render('index.pug')
);

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

app.get('/statistics', function(req, res) {
  var getMonth = []; getTotal = []; tempMonthTotal = []; transMonth = []; getGender = []; getGenderCount = []; tempGenderCount = []; transGend = [];
  con.query('select * from student_chart', function(err, rows, fields) {
    if (err) {
      console.log(err)
    } else {
      getMonth.push('month')
      getTotal.push('Total')
      for (var j = 0; j < rows.length; j++) {
        if (rows[j].month === 1) {
          getMonth.push('January')
        } else if (rows[j].month === 2) {
          getMonth.push('February')
        } else if (rows[j].month === 3) {
          getMonth.push('March')
        } else if (rows[j].month === 4) {
          getMonth.push('April')
        } else if (rows[j].month === 5) {
          getMonth.push('May')
        } else if (rows[j].month === 6) {
          getMonth.push('June')
        } else if (rows[j].month === 7) {
          getMonth.push('July')
        } else if (rows[j].month === 8) {
          getMonth.push('August')
        } else if (rows[j].month === 9) {
          getMonth.push('September')
        } else if (rows[j].month === 10) {
          getMonth.push('October')
        } else if (rows[j].month === 11) {
          getMonth.push('November')
        } else {
          getMonth.push('December')
        }
        getTotal.push(rows[j].Total)
      } 
      tempMonthTotal.push(getMonth, getTotal)
    }
    var transMonth = gChartTranspose(tempMonthTotal);
    console.log(transMonth);

    var q = 'select gender, count(gender) as gender_count from students group by gender';
    console.log(q);
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
      res.render('statistics', {obj1: JSON.stringify(transGend), obj2: JSON.stringify(transMonth)});
    })
  });
});

app.get('/input-student', (req, res) => 
    res.render('input-student.pug')
);

app.post('/input-student', function(req, res) {
  var studentList = [];

  var insertStudent = {
    admission_date: req.body.admission_date,
    name: req.body.name,
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

app.get('/:id', function(req, res){
	con.query('SELECT * FROM students WHERE student_id = ?', [req.params.id], function(err, rows, fields) {
		if(err) throw err
		
		// if user not found
		if (rows.length <= 0) {
				res.redirect('/students')
		} else { 
      var student_admission_date = formatDateForMySQL(rows[0].admission_date);
			var studentDoB = formatDateForMySQL(rows[0].date_of_birth);
			// if user found
			// render to views/index.pug template file
			res.render('edit-student', {
				//data: rows[0],
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

app.post('/edit-student', function(req, res) {
  var student_id = req.body.student_id;
  var admission_date = formatDateForMySQL(req.body.admission_date);
  var name = req.body.name;
  var address = req.body.address;
  var date_of_birth = formatDateForMySQL(req.body.date_of_birth);
  var gender = req.body.gender;
  var major = req.body.major;
  var student_email = req.body.student_email;

  con.query('UPDATE students SET admission_date = ?, name = ?, address = ?, date_of_birth = ?, gender = ?, major = ?, student_email = ? WHERE student_id = ?', [admission_date, name, address, date_of_birth, gender, major, student_email, student_id], function (error, results, fields) {
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

app.post('/filter', function(req, res) {
  var studentList = [];
  var keywords = req.body.keywords;
  var orderby = req.body.orderby;
  var sort = req.body.sort;

  console.log(orderby);
  // Do the query to get data.
  // select * from students  where first_name like '%a%' order by student_id desc;
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

function dataAdapter(obj, cols) {
  //const chartData=[["gender","gender_count"]];
  const chartData = [[...cols]];
  for (row in data) {
    const temp = [];
    for (prop in cols) {
      "gender",
      "gender_count"
    }
    chartData.push(temp);
  }
}



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
