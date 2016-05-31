var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/test");

var TodoSchema = new mongoose.Schema ({
 name : {type: String, required: true}
 });

var TodoModel = mongoose.model('todolist',TodoSchema);

app.get('/',function(req,res){

res.sendFile('C:\\Users\\Rohit\\Desktop\\New folder\\files\\todo.html');  //Use \\merge.html in place of \\todo.html while testing because browsers block access to local resources 
})

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
  
 TodoModel.remove({_id:req.params.id}, function (err) {
     res.send('');
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
console.log("Server running on port 3000");
