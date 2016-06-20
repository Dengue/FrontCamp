var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/blog';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
  
});

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

  findArticles(db, function() {
      db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

  updateAuthors(db, function() {
      db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

  removeArticle(db, function() {
      db.close();
  });
});





var insertDocument = function(db, callback) {
   db.collection('authors').insertOne( {
  		"name": "Jack London",
  		"emails": ["jack_london@mail.ru"],
  		"login": "London",
  		"password-hash": "1111"
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the authors collection.");
    callback();
  });
};

var updateAuthors = function(db, callback) {
   db.collection('authors').updateOne(
      { "name" : "Herbert Wells" },
      {
        $set: { "emails": "wellsAwesome@gmail.com" },
        $currentDate: { "lastModified": true }
      }, function(err, results) {
      console.log(results);
      callback();
   });
};

var findArticles = function(db, callback) {
   var cursor =db.collection('articles').find({
   		'author_id' : 1
   });
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};


var removeArticle = function(db, callback) {
   db.collection('articles').deleteOne(
      { "title": "Auto Interview" },
      function(err, results) {
         console.log(results);
         callback();
      }
   );
};