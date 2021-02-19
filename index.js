const express = require('express');
const app = express();
const fs = require('fs');
const mysql = require('mysql');
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');

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
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.get('/api', (req, res) => {
    connection.query(
        'select * from shoppingMall',
        (err, rows, field) => {
            if(err){
                console.log(err);
            }
            else{
            res.send(rows);
            }
        }
    )
});
app.get('/search/api', (req, res) => {
    const { name } = req.query;
    const sql = `select * from shoppingMall where pct_name like "%${name}%"`;
    connection.query(sql,
        (err, rows, field) => {
            res.send(rows);
        }
    )
});
app.get('/idcheck',(req,res)=>{
    const { id }=req.query;
    const sql = `select 'exits' from member where id="${id}"`;
    connection.query(sql,
        (err,rows,field)=>{
            if(err){
                console.log(err);
            }
            else{
            res.send(rows);
            }
        }
    );
})
app.post('/register', (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
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
});

// --> heroku 
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'client/build')));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,'client/build'));
    })
}


app.listen(port, () => {
    console.log(`port ${port} is listening`);
});
