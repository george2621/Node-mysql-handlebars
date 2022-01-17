import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import dotenv from 'dotenv';
import routes from "./server/routes/user.js"
dotenv.config();

const app = express();

//Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//Static files
app.use(express.static('public'));

//Templating engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');


app.use('/', routes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));