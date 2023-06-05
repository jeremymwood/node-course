const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const authenticator = require('./authenticator');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

app.use(morgan('tiny'));

app.use(logger);
app.use(authenticator);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));