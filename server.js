var express = require('express');
var app = express();
var Fitness = require('./models/fitness')
var bodyParser = require('body-parser')


app.use(express.static(__dirname));
app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//app.use('/files', express.static('browser'));


app.post('/',function(req,res,next){
	Fitness.create({
		pushup : req.body['arr[]'],
		user: req.body.name,
		type: req.body.type
	})
	.then(function(user){
		return res.json(user);
	})
})

app.get('/:userName',function(req,res,next){
	Fitness.findOne({
		user: req.param.userName
	})
	.then(function(user){
		return res.json(user);
	})
})

var server = app.listen(1337, function() {
	console.log('Server listening to 1337');
});