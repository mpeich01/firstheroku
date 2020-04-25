const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://demouser:Mongodb6063@cluster1-cetrw.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(url, function(err, db) {
  if(err) { return console.log(err); }
  
    var dbo = db.db("Textbooks");
	var collection = dbo.collection('books');
	
	var theQuery = { title: /^Who/ };
    collection.deleteMany(theQuery, function(err, obj) {
    if (err) throw err;
    console.log("document(s) deleted");
    });

	db.close();
});



