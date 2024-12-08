import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import logger from "morgan";
import flash from "connect-flash";
import passport from "passport";

const app = express();


app.set("view engine", "ejs");


app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
    optionSuccessStatus: 204,
  })
);

//session
app.use(
  session({
    resave: false, // agar session ki value change na hue ho to fir se save mat krna
    saveUninitialized: false,
    secret: "PLM-Validator",
  })
);
//! passport js setup
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// passport.serializeUser(usersRouter.serializeUser());
// passport.deserializeUser(usersRouter.deserializeUser());

// passport.use(new passportLocal(Auth.authenticate()));
// passport.use(Auth.createStrategy());


// flash used here: popup massage show
app.use(flash());
app.use(logger("dev"));
// app.use(express.static(path.join(__dirname + 'public')));
app.use(express.json({ limit: "16kb" })); // to support JSON-encoded bodies
app.use(express.urlencoded({ extends: true, limit: "16kb" })); // to support URL-encoded bodies
app.use(express.static("public"));
app.use(cookieParser());
// configure our express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export { app };
