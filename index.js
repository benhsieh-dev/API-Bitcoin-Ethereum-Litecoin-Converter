//jshint esversion: 6

const express    = require('express'),
      bodyParser = require('body-parser'),
      request    = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 

app.set("view engine", "ejs"); 

app.get('/', (req, res) => {
  // res.sendFile(__dirname + "/index.html");
  res.render("index"); 
});

app.post('/', (req, res) => {

  let crypto = req.body.crypto;
  let fiat = req.body.fiat;
  let amount = req.body.amount;

  let options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global?",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, (error, response, body) => {

    let data = JSON.parse(body);
    let price = data.price;

    let currentDate = data.time;

    res.write("<p>The current date is " + currentDate + "</p>");
    res.write("<h1>" + amount + crypto + " is " + price + " "  + fiat + "</h1>");

    res.send();

  });

});

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log('server is up and running');
});

