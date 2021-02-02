/*
Rate limits all "logged in" routes.
 */
const rateLimit = new Map();
const fetch = require('node-fetch');
const config = require("./config.js");
const webhookUrl = config.ratelimitHook;
const { getUserInfo } = require('./util/discordHTTP');
/**
 * maxReqs - Max requests per time
 * hugeReq - Send alert if value is greater than this
 * time - Time, in seconds, for maxReq to apply
 */
const maxReqs = 60;
const hugeReq = 120;
const time = 60; // seconds
let lastSent;

module.exports = function (req, res, next) {
	if (!req.headers.authorization) {
		// If no auth stop.
		return res.status(401).send(
			{error:
						{status: 401,
							message: "NotLoggedIn",
							redirect: {
								url: '/api/discord/login',
							}
						}
			});
	} else {
		// Check to see if "Bearer TOKEN" is supplied. If not, stop. If so, remove the "Bearer" part.
		const newAuth = req.headers.authorization.split(" ")[1];
		if (!newAuth) {
			return res.status(401).send(
				{error:
						{status: 401,
							message: "NotLoggedIn",
							redirect: {
								url: '/api/discord/login',
							}
						}
				});
		} else{
			req.headers.authorization = newAuth;
		}
	}
	if (checkUser(req.headers.authorization)) {
		log(`API Request received from ${req.headers.authorization}.`);
		next();
	} else {
		log(`Rejected API request from ${req.headers.authorization}.`);
		res.status(429).send({
			error: {
				status: 429,
				message: "Too many requests. Take a chill pill.",
				retryAfter: time,
			}
		});
	}
};
// returns false for too many requests, true for OK.
function checkUser (auth) {
	const userLimit = rateLimit.get(auth);
	if (userLimit) {
		// If user is over the limit, check the time
		if (userLimit.requests >= maxReqs) {
			if (!(Date.now() - userLimit.set > (time * 1000))) {
				// Invalid!
				if (userLimit.requests > hugeReq) {
					sendAlert(auth, userLimit);
				}
				userLimit.requests += 1;
				rateLimit.set(auth, userLimit);
				return false;
			} else {
				// it's fine due to time
				rateLimit.set(auth, {
					set: Date.now(),
					requests: 1
				});
				return true;
			}
		} else {
			//they're ok
			userLimit.requests += 1;
			rateLimit.set(auth, userLimit);
			return true;
		}
	} else {
		// they havent sent before
		rateLimit.set(auth, {
			set: Date.now(),
			requests: 1
		});
		return true;
	}
}



async function sendAlert(auth, userObj) {
	const userInfo = await getUserInfo(auth);
	let userString;
	if (userInfo.error) {
		userString = `**Auth code**: \`${auth}\``;
	} else {
		userString = `**Username**: \`${userInfo.username}#${userInfo.discriminator}\`\n**User id:** \`${userInfo.id}\``;
	}
	const now = Date.now();
	// Only allow each ip to send an alert per 15 sec
	const alreadySent = userObj.lastAlert ? now - userObj.lastAlert < 15000 : false;
	// if more than 5 secs have passed since last send globally
	if ((!lastSent || now - lastSent > 5000) && !alreadySent) {
		const sendData = {
			content: "@everyone ALERT: Possible attack in progress",
			embeds: [
				{
					title: `Possible DDOS detected. Excessive requests.`,
					description: `${userString}\n**No. Requests**: \`${userObj.requests}\`\n**Time since first request**: \`${(Date.now() - userObj.set) / 1000}\` seconds\n\n**DO NOT IGNORE THIS ALERT.**`,
					color: 11730954
				}
			],
			tts: true
		};
		fetch(webhookUrl, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(sendData), // body data type must match "Content-Type" header
		});
		lastSent = Date.now();
		userObj.lastAlert = Date.now();
		rateLimit.set(auth, userObj);
		log(`Sent alert for ${auth}`);
	} else {
		log(`Not sending alert: too soon. ${auth} - ${userObj.requests}`);
	}
}
const log = (...args)=> {
	const date = new Date();
	console.log(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}: `, ...args);
};

