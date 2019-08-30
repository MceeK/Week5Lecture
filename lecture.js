const mongodb = require('mongodb');
let express = require('express');
let bodyParser = require('body-parser');

const mongodbClient = mongodb.MongoClient;

let app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))


let url = "mongodb://localhost:27017/";
let db = null;
let col = null;
let viewsPath = __dirname + '/views/';

mongodbClient.connect(url,{useNewUrlParser: true},function(err,client){
db = client.db('week5lec');
col = db.collection('customers');
//col.insertOne({name: "Time", age: 23});
});

app.get('/',function(req,res){
    res.sendFile(viewsPath + "index.html");
});

app.post('/newCustomer', function(req,res){
    col.insertOne(req.body);
    res.sendFile(viewsPath+"index.html");
});

// select * from customers;

app.get('/getAll',function(req,res){
    col.find({}).toArray(function(err,data){
        res.send(data);
    });

});

app.listen(8888);