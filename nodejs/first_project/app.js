
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();
/*
// Example of middleware. It intercepts the request...
//...and then passes on to the listener

var logger = function(req,res,next){
	console.log('Logging...');
	next();
};

app.use(logger);
*/

// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));

app.use(function(req,res,next){
	res.locals.errors = null;
	next();
});

var users = [
	{
		id: 1,
		first_name: 'John',
		last_name:  'Doe',
		email: 'johndoe@gmail.com'
	},
	{
		id: 2,
		first_name: 'Sarah',
		last_name:  'Jones',
		email: 'sarahjones@gmail.com'
	},
	{
		id: 3,
		first_name: 'Davide',
		last_name:  'Smith',
		email: 'davidsmith@gmail.com'
	}
];

var person = {
	name:'Jeff',
	age:30
}

var people = [{
	name:'Jeff',
	age: 30
},
{
	name: 'Sara',
	age:  22
},
{
	name:'Bill',
	age: 40
}
]

// View Engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/',function(req,res){
//  If I wanted to send along a json object:
//	res.json(people);
//	res.send('Hello World');
	res.render('index',{
		title: 'Customers',
		users: users
			});
});

app.post('/users/add',function(req,res){

	req.checkBody('first_name','First name is required.').notEmpty();
	req.checkBody('last_name','Last name is required.').notEmpty();
	req.checkBody('email','Email is required.').notEmpty();

	var errors = req.validationErrors();

	if (errors){
		res.render('index',{
			title: 'Customers',
			users: users,
			errors: errors
			});
	}
	else
	{
		var newUser = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email
		};

		console.log('Form Submitted');
		console.log(newUser);
		res.redirect('/');
	}
});

app.delete('/users/delete/:id',function(req,res){
	var id = req.params.id;
	console.log('You tried to delete customer number '+id);
	res.redirect('/');
	
});


app.listen(3000, function(){
console.log('Server Started on Port 3000');
});


