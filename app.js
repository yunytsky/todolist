const express = require("express");
const { use } = require("express/lib/application");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");
// const {connectDB}= require("./config/database");
const { connect } = require("mongoose");
const flash = require("connect-flash");
const errorHandler = require("./lib/errorHandler");
//_______________________________________________________
require("dotenv").config();
//_______________________________________________________
const app = express();
//_______________________________________________________
//DATABASE
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true })
    .catch(err => {console.log("Cannot access the database: ", err)})

const db = mongoose.connection;

db.once("open", () => {
    console.log("Connection to the database is established");
})
db.on("error", (err) => {
    console.log("Connection error: ", err)
})

//_______________________________________________________
//VIEW ENGINE
app.set("view engine", "ejs");
//_______________________________________________________
//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));
app.use(bodyParser.text());

//SESSIONS SETUP
const store = MongoStore.create({ client: db.getClient(), mongoUrl: process.env.DB_STRING, collectionName: "sessions"});

app.use(session({
    secret: process.env.SECRET,
    store: store
}))

//FLASH
app.use(flash());

//PASSPORT AUTHENTICATION
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

//ROUTES  
app.use(routes);

//ERROR HANDLER
app.use(errorHandler);

//404
app.use((req, res) => {
    res.status(404).render("404.ejs");
})


//APP LISTENING
app.listen(process.env.PORT || 3000, () => {
    console.log("App is listening on PORT 3000");
});
