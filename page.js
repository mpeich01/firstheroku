var http = require('http')
var url = require('url')
var readline = require('readline');
var fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:pass@cluster0-rinsk.mongodb.net/test?retryWrites=true&w=majority";
var port = process.env.PORT || 3000;
http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    var stock = url.parse(req.url, true).query;
    var ticker = stock.ticker;
    var name = stock.name;
    if (ticker != "" && name != "") {
        res.end("please only enter one value")
        return
    }

    MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, db) {
        var curr_name = ""
        var curr_tick = ""
        if (err) { console.log("Connection err: " + err); return; }
        var dbo = db.db("stock");
        var coll = dbo.collection('companies');

        coll.find().toArray(function(err, items) {
            if (err) {
                console.log("Error: " + err);
                return "error";
            } else {
                for (i = 0; i < items.length; i++) {
                    curr_name = items[i].stock;
                    curr_tick = items[i].ticker;

                    if (curr_tick == ticker || name == curr_name) {
                        res.end("stock: " + items[i].stock + " ticker: " + items[i].ticker);
                        return;

                    }
                }

                res.end("not found");
            }
        });
    });
}).listen(port);



function load(name, ticker) {
    MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, db) {
        var curr_name = ""
        var curr_tick = ""
        if (err) { console.log("Connection err: " + err); return; }
        var dbo = db.db("stock");
        var coll = dbo.collection('companies');

        coll.find().toArray(function(err, items) {
            if (err) {
                console.log("Error: " + err);
                return "error";
            } else {
                for (i = 0; i < items.length; i++) {
                    curr_name = items[i].stock;
                    curr_tick = items[i].ticker;

                    if (curr_tick == ticker || name == curr_name) {
                        mes = "stock: " + items[i].stock + " ticker: " + items[i].ticker;
                        return mes;


                    }
                }
                return "nada";
            }
        });
    });
}