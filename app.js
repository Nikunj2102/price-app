var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine' , 'ejs');

app.get('/' , function(req ,res){
  res.render("index");
});
app.post('/' ,urlencodedParser,function(req,res){
  console.log(req.body);
  // password : qZNiCBSTLJ5Rx9vVtOCy8uZRYOM47PjLz3c
  request({
    url: `https://price-api.datayuge.com/api/v1/compare/search?api_key=qZNiCBSTLJ5Rx9vVtOCy8uZRYOM47PjLz3c&product=${req.body.item}`,
   json: true
 }, (error, response, body) => {
   if (error) {
     callback('Unable to connect.');
   }
   else {
     console.log(body);
     console.log("--------------------------------------------------");
     console.log("--------------------------------------------------");
     for(var i=0 ; i<body.data.length ; i++){

       request({

         url: `https://price-api.datayuge.com/api/v1/compare/price?api_key=qZNiCBSTLJ5Rx9vVtOCy8uZRYOM47PjLz3c&id=${body.data[i].product_id}`,
         json: true
       }, (error, response, body) => {
         if (error) {
           callback('Unable to connect.');
         }
         else {
          console.log(body);
          console.log("------------------------------------------")
         }
       });

     }
 }
 });
});

app.listen(3000 , () => {
  console.log("Listening on port 3000");
});
