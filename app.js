const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.set("view engine","ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("worldNews",{title: "World News",category: null,data:null});
})
/// world news//
newsApi="https://newsapi.org/v2/top-headlines?country=";
cat="&category=";
apiKey="&apiKey=74f96aa5d67e45a2aaf5b0363b0a1ffc";

app.post("/news",(req,res)=>{
    var country = req.body.country;
    var category = req.body.category;
    request(newsApi+country+cat+category+apiKey,(error,Response,body)=>{
       var data = JSON.parse(body);
        res.render("worldNews",{title: country,category: category, data: data});
    })
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server Listening @3000");
})
