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
    let age = parseInt(req.body.age);
    rec = {
        name: req.body.name,
        age: age
    }
    col.insertOne(rec);
    res.sendFile(viewsPath+"index.html");
});

// select * from customers;

app.get('/getAll',function(req,res){
    col.find({}).toArray(function(err,data){
        res.send(data);
    });

});
// get age equal to 25
query = {age:{$eq:25}}

let query = {};

col.updateOne()

app.listen(8888);