/*
	discordHTTP.js
	Provides discord related HTTP functions, e.g getting user's guilds or their player info. Also handles caching for these values.
		* All caching uses the user's auth as the key.
		* Catch async is also here. I didn't want to put it in a seperate file for no reason.
*/
const fetch = require('node-fetch');

// User info
const userCollection = new Map();
// User VALID servers - Has permission in them.
const userServers = new Map();

const loginURL = "https://polaris-bot.xyz/discord/login";
setInterval(()=> {
	console.log("Clearing discord user cache."); userCollection.clear(); userServers.clear();
}, 1800000);

async function getUserInfo (auth) {
	// Check cache
	if (userCollection.get(auth)) {
		const cachedInfo = userCollection.get(auth);
		cachedInfo.cached = true;
		return cachedInfo;
	}

	const json = await discordFetch(`https://discordapp.com/api/users/@me`, auth);
	if (json.error) {
		return json;
	}
	if (json.id) {
		// Its valid, don't want to set invalid to cache
		userCollection.set(auth, json);
	}
	return json;
}

async function getUserServers (auth) {
	if (userServers.get(auth)) {
		return userServers.get(auth);
	}

	const json = await discordFetch(`https://discordapp.com/api/users/@me/guilds`, auth);
	if (json.error) {
		return json;
	}

	const allowedServers = [];

	for (let guild of json) {
		if (hasPerms(guild.permissions)) {
			allowedServers.push(guild);
		}
	}
	userServers.set(auth, allowedServers);
	return allowedServers;
}

const catchAsyncErrors = fn => (
	(req, res, next) => {
		const routePromise = fn(req, res, next);
		if (routePromise.catch) {
			routePromise.catch(err => next(err));
		}
	}
);

module.exports = {
	_userServers: userServers,
	_userCollection: userCollection,

	getUserInfo: getUserInfo,
	getUserServers: getUserServers,

	catchAsync: catchAsyncErrors,
	hasPerms: hasPerms
};

function hasPerms(permInt) {
	const manageServer =  1 << 5;
	const admin = 1 << 3;

	if (permInt & manageServer) {
		return true;
	} else if (permInt & admin) {
		return true;
	} else {
		return false;
	}
}
// For HTTP requests to discord.
async function discordFetch (url, auth) {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${auth}`
		}
	});

	if (response.status === 401) {
		return ({error: {status: 401, message: "InvalidOrExpiredToken", redirect: loginURL}});
	} else if (!response.ok) {
		return ({error: {status: response.status, message: response.json().message}});
	}
	const json = await response.json();
	return json;
}
