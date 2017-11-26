var express             = require("express"), 
    app                 = express(),
    request             = require("request"), 
    bodyParser          = require("body-parser"), 
    mongoose            = require("mongoose"),
    Campground          = require("./models/campground"),
    Comment             = require("./models/comment"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    flash               = require("connect-flash"),
    User                = require("./models/user"),
    methodOverride      = require("method-override"),
    seedDB              = require("./seeds");
    
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes   = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");
    
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/yelp_camp_v14", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(flash());
//seedDB();

//passport conf

app.use(require("express-session")({
    secret: "MartinRafalCzarekArturMichalHubertDanielRadekPaulina",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("serwer wystartowal");
})

