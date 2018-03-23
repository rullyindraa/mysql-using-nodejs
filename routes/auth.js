const express           = require('express');
const router            = express.Router();
const passport          = require('passport');
const async             = require('async');
const con               = require('./con');
const env               = process.env.NODE_ENV || 'development';
const config            = require('../config/config')[env];
const crypto            = require('crypto');
const expressValidator  = require('express-validator');
const flash             = require('express-flash');
const moment            = require('moment');
const sgMail            = require('@sendgrid/mail');
const sgApiKey          = sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/login', function(req, res) {
  if (req.isAuthenticated()) {
    res.render('index');
  } else {
    res.render('login');
  }
});
  
router.post('/login', passport.authenticate('local', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}), function(req, res, info) {
  res.render('login', {'message' : req.flash('message')});
});

router.get('/', function(req, res) {
  if (req.isAuthenticated()) {
    res.render('index');
  } else {
    res.render('login');
  }
});

router.get('/logout', function(req, res) {
  if(!req.isAuthenticated()) {
    notFound404(req, res, next);
  } else {
    req.logout();
    res.redirect('/login');
  }
});  
  
router.get('/forgot', function(req, res) {
  if (req.isAuthenticated()) {
    res.render('index');
  } else {
    res.render('forgot');
  }
});
  
router.post('/forgot', function(req, res, next) {
  req.assert("email", "Enter a valid email address.").isEmail()
  var errors = req.validationErrors();
  if (errors) {
    var error_message = '';
    errors.forEach(function (error) {
      error_message += error.msg + '\n'
    })
    req.flash('error', error_message);
    res.render('forgot');
  } else {
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
            
            con.query('UPDATE users set reset_pwd_token = ?, reset_pwd_exp = ? WHERE email = ?', [pwdToken, pwdExp, email], function(err, rows) {
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
  }
});
  
router.get('/reset/:token', function(req, res) {
  if (req.isAuthenticated()) {
    res.render('index');
  } else {
    con.query('SELECT * FROM users WHERE reset_pwd_token = ?', [req.params.token], function(err, rows) {
      if (rows.length <= 0) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/forgot');
      }
      res.render('reset');
    });
  }
});
  
router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      con.query('SELECT * FROM users WHERE reset_pwd_token = ?', [req.params.token], function(err, rows) {
        console.log(rows);
        if (!rows.length > 0) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('/forgot');
        }
        var email = rows[0].email;
        var password = req.body.password;
        var pass = config.salt.salt+''+password;
        var pwd = crypto.createHash('sha1').update(pass).digest('hex')
        var reset_pwd_token = undefined;
        var reset_pwd_exp = null;
  
        con.query('UPDATE users set password = ?, reset_pwd_token = ?, reset_pwd_exp = ? WHERE email = ?', [pwd, reset_pwd_token, reset_pwd_exp, email], function(err) {
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

module.exports = router;
