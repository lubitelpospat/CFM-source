// Require statements
const express = require('express');
// Routes
const roblox = require('./routes/roblox');
const servers = require('./routes/servers');
const discord = require('./routes/discord');
const config = require("./config");
const fetch = require ("node-fetch");

const router = express.Router();


router.use('/discord', discord);
router.use('/roblox', roblox);
router.use('/servers', servers);


// General api

/* Valid types for alert:
primary, secondary, success, danger, warning, info, light, dark
Anything added after a space will be interpreted as a class on the Alert element.
*/

router.get('/alert', function (req, res) {
	res.send({
		type: 'info',
		message: 'Polaris panel <strong>ALPHA</strong>: Hello world.', // <a href="#" class="alert-link">an example link</a>
		active: false
	});
});
//DBL wekhook
router.post('/vote', function (req, res) {
	// Validate auth header.
	if (!req.headers.authorization || req.headers.authorization !== config.voteSecret ) {
		return res.status(401).send({error: {status: 401, message: "Invalid or incorrect vote secret."}});
	}
	let sendData = {};
	if (req.body.type === "test") {
		// It's a test
		sendData = {
			content: `:tada: <@${req.body.user}> just tested the Polaris vote notifier.`,
		};
	} else {
		// its a real vote

		sendData.content = req.body.isWeekend ? `:tada: <@${req.body.user}> just upvoted Polaris during double vote weekend!` : `:tada: <@${req.body.user}> just upvoted Polaris!`
	}
	fetch(config.voteWebhook, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(sendData),
	});
});



// 404 page for API
router.use(function (req, res) {
	res.status(404);
	res.send({error: {message: 'Blank API page', status: 404}});
});
module.exports = router;
