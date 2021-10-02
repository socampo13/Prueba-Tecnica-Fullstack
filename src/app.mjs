import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import session from "express-session";
import methodOverride from "method-override";
import flash from "connect-flash"
import passport from "passport";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import { createAdminUser } from "./libs/createUser.mjs";
import config from "./config";
import indexRoutes from "./routes/index.routes.mjs";
import notesRoutes from "./routes/notes.routes.mjs";
import userRoutes from "./routes/user.routes";
import "./config/passport";


//Inicializar
const app = express();
createAdminUser();

//Ajustes
app.set("port", config.PORT);
app.set("views", path.join(__dirname, "views"));
app.engine(
    ".hbs",
    exphbs({
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        extname: ".hbs",
    })
);
app.set("view engine", ".hbs");

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: config.MONGODB_URI }),
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});

//routes
app.use(indexRoutes);
app.use(userRoutes);
app.use(notesRoutes);

app.use(express.static(path.join(__dirname, "public")));
app.use((req, res) => {
    res.render("404");
});

export default app;