var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

//server.listen(8035);
io.sockets.on('connection', function (socket){
	socket.on('send messege', function (data){
		io.sockets.emit('broadcast', data);
	});
});
//----------CONFIGURATIONS----------------------------
app.configure(function () {
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/public/views'); // __dirname = root folder.
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({secret: "keyboard cat"}));
	app.use(app.router);
});
//-------------------------------------------------

//=======================ROUTES=============================
//----------------------POST---------------------------------

//----------------------GET----------------------------------
app.get('/', function (req, res){
	res.render('chat', {title:"CHATTER BOX v1.0"});
});
//==========================================================

server.listen(8035, function(){
	console.log("Application is now listening to port: 8035");
});