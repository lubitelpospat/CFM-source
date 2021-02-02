// Express
const express = require('express');
const app = express();

// Require statements
const path = require("path");
const bodyParser = require('body-parser');
const fs = require("fs");
const api = require('./api.js');
const config = require('./config.js');

// Sentry
const Sentry = require('@sentry/node');
Sentry.init({ dsn: config.sentryToken });

// Paths
const filePath = path.resolve(__dirname, '..' , '..','dist', 'panel.html');
const staticPath = path.resolve(__dirname, '..', '..', 'public');
const distPath = path.resolve(__dirname, '..', '..', 'dist');
//Config
const port = config.port;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);

app.use('/public', express.static(staticPath));
app.use('/', express.static(distPath));
// Setup
let fileExists;
fs.access(filePath, fs.constants.F_OK, (err) => {
	fileExists = !err;
});

// STATIC FILES
app.get('/', function (req, res) {
	console.log(`Request to index from ${req.ip}`);
	res.sendFile(path.join(staticPath, 'home.html'));
});

app.get('/commands', function (req, res) {
	console.log(`Request to command page from ${req.ip}`);
	res.sendFile(path.join(staticPath, 'commands.html'));
});

app.get('/terms', function (req, res) {
	console.log(`Request to Terms page from ${req.ip}`);
	res.sendFile(path.join(staticPath, 'terms.html'));
});

app.get('/panel', function (req, res) {
	console.log(`Request to web panel page from ${req.ip}`);
	if (fileExists) {
		res.sendFile(filePath);
	} else {
		console.log(`Redirecting to ${config.baseurl}:3000${req.path}`);
		res.redirect(`${config.baseurl}:3000${req.path}`);
		//res.status(404).send({error: {status: 404, message: "Page not found"}});
	}
});

app.get('/panel/*', function (req, res) {
	console.log(`Request to web panel page from ${req.ip}`);
	if (fileExists) {
		res.sendFile(filePath);
	} else {
		console.log(`Redirecting to ${config.baseurl}:3000${req.path}`);
		res.redirect(`${config.baseurl}:3000${req.path}`);
	}
});


// Error handler
// eslint-disable-next-line no-unused-vars
app.use(function (error, req, res, next) {
	if (error instanceof SyntaxError) {
		res.status(400).send({error: {status: 400, message: "Invalid json"}});
	} else if (error.code === "ECONNABORTED") {
		// We've been getting a lot of these. It's not sentry worthy, nor a server error.
		// Caused by request being aborted before complete
		res.status(400).send({error: {status: 400, message: "request aborted"}});
	} else {
		console.error('Error caught: ', error.stack);
		res.status(500).send({error: {status: 500, message: error.message}});
		Sentry.captureException(error);
	}
});


// Error catchers. Shouldn't be used.
process.on('uncaughtException', function(err) {
	console.log( " UNCAUGHT EXCEPTION " );
	console.log( "[Inside 'uncaughtException' event] " + err.stack || err.message );
});
process.on('unhandledRejection', function(err) {
	console.log( " UNCAUGHT REJECTION " );
	console.log( "[Inside 'uncaughtRejection' event] " + err.stack || err.message );
});
app.listen(port, () => console.log('Listening on port ' + port));
