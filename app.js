//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO
mongoose.connect("mongodb://localhost:27017/wikiDB")
const articleSchema={
    title:String,
    content:String
}
const Article=mongoose.model("Article",articleSchema)

app.route("/articles")
.get(function(req,res){
    Article.find().then((data)=>{
    res.send(data);
    }).catch((err)=>{if(err) console.log(err)})
})
.post(function(req,res){

    const newArticle=new Article({
        title:req.body.title,
        content:req.body.content
    })
    newArticle.save().then(()=>{res.send("sucessfully added a new article");})
    .catch((err)=>{if(err) console.log(err)})
})
.delete(function(req,res){
        Article.deleteMany().then(()=>{res.send("sucessfully deleted all the articles")})
        .catch((err)=>{res.send(err)});
}) 
app.route("/articles/:articleTitle")

 .get(function(req,res){
     Article.findOne({title:req.params.articleTitle}).then((data)=>{
       res.send(data);
    
     }).catch((err)=>{res.send(err)})}
  )
  .put(function(req,res){
    Article.updateOne (
        {title:req.params.articleTitle},
        {title:'"'+req.body.title+'"',content:'"'+req.body.content+'"'}
        ).then(()=>{res.send("updated successfully")})
    // res.send(req.params.articleTitle)
    // console.log(req.body.title)
    // console.log(req.body.content)
    
  })
  .patch(function(req,res){
    Article.updateOne (
        {title:req.params.articleTitle},
        {$set:req.body}
    ).then((err)=>{res.send(err)})
  })
  .delete(function(req,res){
    Article.deleteOne(
        {title:req.params.articleTitle}
    ).then(()=>{res.send("deleted sucessfully")})
  })

app.listen(3000, function() {
  console.log("Server started on port 3000");
});