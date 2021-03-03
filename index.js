const express = require('express');
const app = express();
const fs = require('fs');
const mysql = require('mysql');
const conf = JSON.parse(fs.readFileSync('./database.json'));
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const crypto = require('crypto');
const key = JSON.parse(fs.readFileSync('./key.json'));
const jwt = require('jsonwebtoken');
const jwtJSON = JSON.parse(fs.readFileSync("./jwt.json"));





const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect(err => {
    console.log(err);
});

app.use(helmet());
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


app.get('/api', (req, res) => {
    connection.query(
        'select * from shoppingMall',
        (err, rows, field) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(rows);
            }
        }
    )
});
app.get('/search', (req, res) => {
    const { name } = req.query;
    const sql = `select * from shoppingMall where pct_name like "%${name}%"`;
    connection.query(sql,
        (err, rows, field) => {
            if (err) {

            }
            else {
                res.send(rows);
            }
        }
    )
});
app.get('/idcheck', (req, res) => {
    const { id } = req.query;
    const sql = `select 'exits' from member where id="${id}"`;
    connection.query(sql,
        (err, rows, field) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(rows);
            }
        }
    );
})
app.post('/register', (req, res) => {
    const id = req.body.id;
    const password = crypto.createHmac('sha256', key.secret).update(req.body.password).digest('base64'); //암호화
    const nickname = req.body.nickname;
    const address = req.body.address;
    const params = [id, password, nickname, address];
    connection.query('insert into member values(?,?,?,?)', params,
        (err, rows, field) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(rows);
            }
        }

    )
})


// app.post('/login', (req, res) => {
//     const id = req.body.inputId;
//     const password = crypto.createHmac('sha256', key.secret).update(req.body.inputPs).digest('base64');
//     const params = [id, password];
//     const customerInfo={};
//     connection.query('select * from member where id=? and password=?', params,
//         (err, rows, field) => {
//             if(err){
//                 console.log(err);
//             }
//             else{
        
//                 console.log(rows);
//             }
//         }
//     )
// }) // => 로그인 



// --> heroku 
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}




app.listen(port, () => {
    console.log(`port ${port} is listening`);
});
