var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

mongoose.connect("mongodb://localhost/todolist");

var TodoSchema = new mongoose.Schema ({
 name : {type: String, required: true},
 status: {type: Boolean, default: false}
 });

var TodoModel = mongoose.model('todolist',TodoSchema);

app.get('/',function(req,res){

res.sendFile(__dirname+ '/todo.html');
});

app.get('/todolist', function (req, res){
    TodoModel.find(function(err,tasks){
      res.json(tasks);
     });
});

app.post('/todolist', function (req, res) {

  TodoModel.create({name:req.body.name},function(err,task){
    res.json(task);
  });
   
});

app.delete('/todolist/:id', function (req, res) {
  
 TodoModel.remove({_id:req.params.id}, function (err, task) {
     res.json(task);
 });
});

app.get('/todolist/:id', function (req, res) {
  
  TodoModel.findById(req.params.id, function (err, task){
    res.json(task);
  });
});

app.put('/todolist/:id', function (req, res) {
  
  TodoModel.findByIdAndUpdate(req.params.id,
     {name: req.body.name},
      function (err, task) {
    
      res.json(task);
    }
  );
});

app.listen(3000);
console.log("localhost running on port 3000");
