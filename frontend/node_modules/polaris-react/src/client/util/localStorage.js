/*
	Interfaces with session storage and the API to provide Roblox and Discord stuff
*/
/* global Sentry */

const {apiFetch}  = require('./apiFetch.js');
try {
	sessionStorage.setItem("polarisTestCompat", "itWorks!_934kjasd");
	if (sessionStorage.getItem("polarisTestCompat") !== "itWorks!_934kjasd") {
		// It's wrong: what?!
		alert("Session storage is not functioning correctly.");
	}
} catch (e) {
	// Session storage is not available.
	alert("Could not set session storage. Please enable cookies etc.");
}


// Extend the storage object (and hence session storage) to support objects.
Storage.prototype.setObject = function(key, value) {
	this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
	var value = this.getItem(key);
	return value && JSON.parse(value);
};

module.exports.getGroupInfo = async function (groupId) {

	let cachedInfo = sessionStorage.getObject(groupId);
	if (cachedInfo) {
		return cachedInfo;
	}
	const res = await apiFetch(`/api/roblox/group/${groupId}`);
	if (res.error) {
		console.error(res);
		return res;
	} else {
		sessionStorage.setObject(groupId, res);
		return res;
	}
};




module.exports.getDiscordInfo = async function () {

	let cachedInfo = sessionStorage.getObject("discord");
	if (cachedInfo) {
		return cachedInfo;
	}
	const json = await apiFetch(`/api/discord/@me`);
	if (json.error) {
		console.error(json);
		return json;
	} else {
		sessionStorage.setObject("discord", json);
		Sentry.configureScope((scope) => {
			scope.setUser({
				id: json.id,
				username: json.username,
				discordDisc: json.discriminator
			});
		});
		return json;
	}
};
// Bad idea? Yes. Very very easy to lose cache. Only meant to store them while this page is open. Won't bother with autoclear: Refreshing will do it.
const discordRolesCache = {};
module.exports.getDiscordRoles = async function (guildId) {
	guildId = guildId || window._discordServerId;
	let cachedInfo = discordRolesCache[guildId];
	if (cachedInfo) {
		return cachedInfo;
	}
	const json = await apiFetch(`/api/servers/${guildId}/roles`);
	if (json.error) {
		console.error(json);
		return json;
	} else {
		discordRolesCache[guildId] = json;

		return json;
	}
};
