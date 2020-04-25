const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:pass@cluster0-rinsk.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
MongoClient.connect(uri, { useUnifedTopology: true }, function(err, db) {

    if (err) { return console.log(err); }

    var dbo = db.db("stock");
    var collection = dbo.collection('companies');

    var newData = { "stock": stocks[0], "ticker": stocks[1] };
    collection.insertOne(newData, function(err, res) {
        if (err) throw err;
        console.log("new document inserted");
    });

    console.log("Success!");
    db.close();

});