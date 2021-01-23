var restify = require('restify');
var errors = require('restify-errors');
var mysql = require('mysql');
require('dotenv').config();

var port = process.env.API_PORT;
if (!port) {
    port = 8888;
}

var connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD
});

var server = restify.createServer();

server.use(restify.plugins.bodyParser());

// get all notes
server.get('/notas', function (request, response, next) {
	connection.query('select * from notes.Note order by Id desc', function (error, results, fields) {
		if (error) { next(error); return; }
		response.end(JSON.stringify(results));
	});
});

server.get('/', function tempo(request, response, next) {
			const dynamicDate = new Date();

			response.json({date: dynamicDate.toGMTString(),
			Projeto: "API de integração com Banco MySql"
			});
				
});

// create note
server.post('/notas', function (request, response, next) {
	if(!request.body) { return next(new errors.BadRequestError("texto inválido")); }
	connection.query('insert into notes.Note (Text) values ("?")', [request.body], function (error, results, fields) {
		if (error) { next(error); return; }
		response.end("Computado");
	});
});

// delete note
server.del('/notas/:id', function (request, response, next) {
	var id = request.params.id;
	
	if(!id || id <= 0) { return next(new errors.BadRequestError("id inválido")); }
	
	connection.query('delete from notes.Note WHERE Id=?', [id], function (error, results, fields) {
		if (error) { next(error); return; }
		if(!results.affectedRows) { next(new errors.BadRequestError("id inválido")); return; }
		response.end("Deletado");
	});
});

server.listen(port, function () {
	console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;
