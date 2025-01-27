const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')

const mongoConnect = require('./db/connect');
mongoConnect()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.listen(process.env.PORT , () =>{
    console.log(`Server running on http://localhost:${process.env.PORT}`)
});