var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Super camp", 
        image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec sem eu turpis dictum finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean lobortis a massa vel condimentum. Suspendisse viverra, orci eu tincidunt maximus, elit risus interdum ligula, et mollis mi ligula at ligula. Aliquam ante felis, gravida sit amet enim ut, auctor consectetur nisi. Vivamus dolor odio, posuere id venenatis sed, convallis non risus. Praesent sed semper purus. Cras dapibus justo in libero tempor, a congue elit mollis. Nam ornare mi at justo fringilla vulputate pulvinar ut ex. Ut quis nunc purus. Pellentesque mattis elementum aliquet. Nam porta metus finibus arcu eleifend iaculis. Aenean massa arcu, ultricies id nisi nec, eleifend ultricies ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec varius ullamcorper augue ac blandit."
    },
    {
        name:"Dzika kolonia", 
        image:"https://images.pexels.com/photos/216675/pexels-photo-216675.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec sem eu turpis dictum finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean lobortis a massa vel condimentum. Suspendisse viverra, orci eu tincidunt maximus, elit risus interdum ligula, et mollis mi ligula at ligula. Aliquam ante felis, gravida sit amet enim ut, auctor consectetur nisi. Vivamus dolor odio, posuere id venenatis sed, convallis non risus. Praesent sed semper purus. Cras dapibus justo in libero tempor, a congue elit mollis. Nam ornare mi at justo fringilla vulputate pulvinar ut ex. Ut quis nunc purus. Pellentesque mattis elementum aliquet. Nam porta metus finibus arcu eleifend iaculis. Aenean massa arcu, ultricies id nisi nec, eleifend ultricies ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec varius ullamcorper augue ac blandit."
    },
    {
        name:"Wspaniały ogród", 
        image:"https://images.pexels.com/photos/116104/pexels-photo-116104.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec sem eu turpis dictum finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean lobortis a massa vel condimentum. Suspendisse viverra, orci eu tincidunt maximus, elit risus interdum ligula, et mollis mi ligula at ligula. Aliquam ante felis, gravida sit amet enim ut, auctor consectetur nisi. Vivamus dolor odio, posuere id venenatis sed, convallis non risus. Praesent sed semper purus. Cras dapibus justo in libero tempor, a congue elit mollis. Nam ornare mi at justo fringilla vulputate pulvinar ut ex. Ut quis nunc purus. Pellentesque mattis elementum aliquet. Nam porta metus finibus arcu eleifend iaculis. Aenean massa arcu, ultricies id nisi nec, eleifend ultricies ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec varius ullamcorper augue ac blandit."
    },
    {
        name:"Górski obóz wspinaczkowy", 
        image:"https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec sem eu turpis dictum finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean lobortis a massa vel condimentum. Suspendisse viverra, orci eu tincidunt maximus, elit risus interdum ligula, et mollis mi ligula at ligula. Aliquam ante felis, gravida sit amet enim ut, auctor consectetur nisi. Vivamus dolor odio, posuere id venenatis sed, convallis non risus. Praesent sed semper purus. Cras dapibus justo in libero tempor, a congue elit mollis. Nam ornare mi at justo fringilla vulputate pulvinar ut ex. Ut quis nunc purus. Pellentesque mattis elementum aliquet. Nam porta metus finibus arcu eleifend iaculis. Aenean massa arcu, ultricies id nisi nec, eleifend ultricies ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec varius ullamcorper augue ac blandit."
    }
    ] 


function seedDB(){
    
    //remove all campgrounds
    
    Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("remove campgrounds");
        // add a campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                 }else{
                    console.log("created camp")
                    Comment.create(
                        {
                            text: "this place is great",
                            author: "Homer Simon"
                            
                        }, function(err, comment){
                            if(err){
                                console.log(err)
                            }
                            else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                        }
                        );
                    }
            })  
        })
    }
})
    
    
    
    // add a few coments
}

module.exports = seedDB