const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });


const routes = require('./controllers');
const path = require('path');
const sequelize = require('./config/connection')
const express = require('express');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);


const sess = {
    secret: 'secret secrets are no fun', 
    cookie: {
        expires: 5 * 60 * 1000

    },

    rolling: true,
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }), 

};

// To use Handlebars as an engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routes);

//Parsing json with middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(session(sess));

app.use(express.static(path.join(__dirname, 'public')));





app.listen(PORT, () => {
    console.log(App listening on port ${PORT}!);
    sequelize.sync({ force: false });
  });