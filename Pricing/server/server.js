const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors());


const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;

const db = mysql.createPool({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbDatabase,
});


app.get('/api/prices', (req, res) => {
    db.query('SELECT * FROM prices', (err, result) => {
        if (err) {
            console.log(err);
            res.send({ message: "Erro ao buscar os preços" });
            return;
        }
        res.json(result);
    });
});

app.get('/api/features', (req, res) => {
    db.query('SELECT * FROM features', (err, result) => {
        if (err) {
            console.log(err);
            res.send({ message: "Erro ao buscar os preços" });
            return;
        }
        res.json(result);
    });
});

app.listen(`${process.env.PORT}`, () => {
    console.log('Server is running')
})