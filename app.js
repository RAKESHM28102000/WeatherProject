const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");

const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
   
    res.sendFile(__dirname+"/index.html");
    
});
app.post("/",function(req,res){
    const city=req.body.city;
    const unit="metric";
    const apiKey="cd056c084b4ed63dca7994ec2ef47c34";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const description =weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageUrl="https://openweathermap.org/img/wn/"+icon+"@4x.png"
           //console.log(JSON.stringify(object));-- to reduce size of json code
           res.write("<p> <strong>the weather is currently "+description+"</strong></p>");
           res.write("<h1>the temperature in "+city+" is "+temp +" decree celcius </h1>");
           res.write("<img src="+imageUrl+">");
           res.send();
        });
    });
    

});

app.listen(process.env.PORT || 3000,function(){
    console.log("this is port no 3000");
});