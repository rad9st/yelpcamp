// all middleware

var Campground = require("../models/campground")
var Comment = require("../models/comment")



var middlewareObj = {}

middlewareObj.messages = {
    errorPermision: "You don't have permision to do that",
    errorLogged: "You must to be logged in to do that",
    errorCampNotFound: "Campground not found",
    successCreate: "SuccesCreate"
    
};

middlewareObj.checkCampgroundOwnership = function(req ,res ,next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCamp){
                if(err){
                    req.flash("error", this.messages.errorCampNotFound)
                    res.redirect("back")
                }else{
                        if(foundCamp.author.id.equals(req.user._id)){
                        next();
                        }else{
                        req.flash("error", this.messages.errorPermision);
                        res.redirect("back")
                        }
                }
});
}else{
    req.flash("error", this.messages.errorLogged)
    res.redirect("back")
    
}
}

middlewareObj.checkCommentOwnership = function(req ,res ,next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    res.redirect("back")
                }else{
                        if(foundComment.author.id.equals(req.user._id)){
                            next();
                        }else{
                            res.redirect("back")
                        }
                }
});
}else{res.redirect("back")}
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must to be logged in to do that");
    res.redirect("/login");
}

middlewareObj.checkUserCampground = function(req, res, next){
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err || !foundCampground){
          console.log(err);
          req.flash("error", "Sorry, that campground does not exist!");
          res.redirect("/campgrounds");
      } else if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
          req.campground = foundCampground;
          next();
      } else {
          req.flash("error", "You don't have permission to do that!");
          res.redirect("/campgrounds/" + req.params.id);
      }
    });
  }
  
middlewareObj.checkUserComment = function(req, res, next){
    Comment.findById(req.params.commentId, function(err, foundComment){
       if(err || !foundComment){
           console.log(err);
           req.flash('error', 'Sorry, that comment does not exist!');
           res.redirect('/campgrounds');
       } else if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
            req.comment = foundComment;
            next();
       } else {
           req.flash('error', 'You don\'t have permission to do that!');
           res.redirect('/campgrounds/' + req.params.id);
       }
    });
  }

module.exports = middlewareObj