const https = require('https');
const fs = require('fs');
var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
var app = express();
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tiberotmax',
    database: 'personalSite'
});
app.use(bodyParser.json());
app.use(cors());
var router = require('./router/main')(app);

conn.connect();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.post('/sign-up', function (req, res) {
    console.log(req.body.id);
    // res.render('sign-up-success.html');

    let id = req.body.id;
    let password = req.body.password;

    if (!id || !password) {
        res.send('Either id or password is missing');
        return;
    }

    let sql = 'insert into users values (?, ?)';
    let params = [id, password];

    conn.query(sql, params, function (err, rows, fields) {
        if (err) {
            res.status(400);
            res.send('Duplicate id');
            console.log(err);
        }
        else {
            console.log(rows);
            res.send('Sign up successful');
            // res.render('sign-up-success.html');
        }
    });
});

// conn.end();

var server = app.listen(3000, function () {
    console.log("Express server has started on port 3000")
});

// https.createServer({
//   key: fs.readFileSync('./certificates/server.key'),
//   cert: fs.readFileSync('./certificates/server.cert')
// }, app).listen(3000, () => {
//   console.log('Listening...')
// });

app.use(express.static('public'));