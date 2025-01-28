const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const path = require('path')

const mongoConnect = require('./db/connect');
mongoConnect()

const menuRouter  = require('./router/menuRouter')

app.use(cors());
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(menuRouter);

app.listen(process.env.PORT , () =>{
    console.log(`Server running on http://localhost:${process.env.PORT}`)
});