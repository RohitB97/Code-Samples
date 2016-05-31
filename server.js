var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/database");

var todoschema = new mongoose.Schema ({
 name : {type: String, required: true}
 });
 

var todomodel = mongoose.model('todolist',todoschema);

app.get('/',function(req,res){
   res.sendFile('C:\Users\Rohit\Desktop\New folder\todo.html');
})

app.get('/todolist', function (req, res){
    todomodel.find(function(err,tasks){
      res.json(tasks);
     });
});

app.post('/todolist', function (req, res) {
  
  todomodel.insert(req.body, function(err, task) {
    res.json(task);
  });
});

app.delete('/todolist/:id', function (req, res) {
  
 todomodel.remove(req.params.id, function (err, task) {
    res.json(task);
  });
});

app.get('/todolist/:id', function (req, res) {
  
  todomodel.findById(req.params.id, function (err, task) {
    res.json(task);
  });
});

app.put('/todolist/:id', function (req, res) {
  
  todomodel.findAndModify({
     query: req.params.id,
     update: {$set: {name: req.body.name}},
     new: true}, function (err, task) {
      
      res.json(task);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");
