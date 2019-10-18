const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const userRouter = require('./routes/users');


mongoose.Promise = global.Promise; // Usamos las promesas de Node Js
mongoose.connect('mongodb://localhost/restApiEjemplo', {
    useMongoClient: true
})
    .then(db => console.log('db is connected'))
    .catch(err => console.log(err))
;
// Setting
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); // Soporta texto plano
app.use(express.json()); // permite recibir formatos json
app.use(bodyParser.json()); 

// routes
app.use(require('./routes/index'));
app.use('/users', userRouter);

// starting server
app.listen(app.get(`port`), () => {
    console.log(`Server on port ${app.get('port')}`);
});