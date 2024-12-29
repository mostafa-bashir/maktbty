const port = 8000;

// For databse
require('dotenv').config();

const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql'

    }
);

const express = require('express')
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'));

const session = require('express-session');
const store = new session.MemoryStore();
app.use(session({
    secret: 'secret',
    store,
    resave: true,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');

const adminAuth = (req, res, next) => {

  if (req.session.user) {
    if(req.session.user.type == 'librarian' && req.path.startsWith("/admin") || req.session.user.type == 'reader' && !req.path.startsWith("/admin")){
      next();
  }else{
      res.render('common/unauth')
  }
}else{
next()
}
}


const requireAuth = (req, res, next) => {
    const isAuthRoute = ["/login", "/signup", "/admin/login", "/admin/signup"].includes(req.path);
  
    if (!req.session.user) {
      // If the user is not logged in
      if (isAuthRoute) {
        return next(); // Allow access to login or signup pages
        }
      if (req.path.startsWith("/admin")) {
        // Redirect admin routes to admin login
        return res.redirect("/admin/login");
      } else {
        // Redirect other routes to general login
        return res.redirect("/login");
      }
    }
  

    // If the user is logged in, prevent access to login/signup pages
    if (isAuthRoute) {
      return res.redirect(req.path.startsWith("/admin") ? "/admin/allbooks" : "/books");
    }
  

    next(); // Proceed to the intended route
  };
  

 app.use(requireAuth);
  app.use(adminAuth)
 



const admin = require('./apis/admin/admin');
app.use("/admin", admin);

const reader = require('./apis/reader/reader');
app.use("/", reader);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});