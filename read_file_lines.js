var readline = require('readline');
var fs = require('fs');
var http = require('http')
var url = require('url')

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:pass@cluster0-rinsk.mongodb.net/test?retryWrites=true&w=majority";

var stocks = [];

function read() {
    var lines = ""
    fs.readFile('companies.csv', 'utf8', function(err, contents) {
        lines = contents.replace(/(\r\n|\n|\r)/gm, ",");
        stocks = lines.split(',');
        return stocks;
    });
}


function insert() {
    stocks = read();
    MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, db) {
        for (i = 0; i < stocks.length - 1; i += 2) {
            if (err) { return console.log(err); }

            var dbo = db.db("stock");
            var collection = dbo.collection('companies');
            //connecting to db
            // getting data

            var newData = { "stock": stocks[i], "ticker": stocks[i + 1] };
            collection.insertOne(newData, function(err, res) {
                if (err) throw err;
                console.log("new document inserted");
            });

            console.log("Success!");
            //  db.close();
        }
    });
}