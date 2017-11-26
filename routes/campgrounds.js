var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(!err){
              res.render("campgrounds/index", {campgrounds: campgrounds});
        }
        else{
            console.log(err);
        }
    })
    
   
});

router.post("/",middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = {id: req.user._id, username: req.user.username}
    var camp = {name: name, price: price, image: image, description: description, author: author};
    // camps.push(camp);
    Campground.create(camp, function(err, camp){
        if(!err){
            console.log("camp save")
            res.redirect("/campgrounds");
        }
        else{
            console.log(err);
        }
    })
    
    
})

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
})

router.get("/:id", function(req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(!err){
            res.render("campgrounds/show", {campground: foundCamp});
        }else{
            console.log(err);
        }
    });    
    
})

//edit route

router.get("/:id/edit", middleware.isLoggedIn, middleware.checkUserCampground, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
            res.render("campgrounds/edit", {campground: foundCamp})
    })
});

//update route

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updateCamp){
        if(err){
            res.redirect("/campgrounds")
        }
        else{
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
});

//destroy route

router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds")
        }else{
            res.redirect("/campgrounds")
        }
    })
})

module.exports = router;