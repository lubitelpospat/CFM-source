module.exports.apiFetch = async function (url, options) {
	const a = module.exports.getCookie("auth");
	options = options || {};
	options.credentials = "include";
	options.headers = options.headers || {};
	options.headers.Authorization = `Bearer ${a}`;

	let json;
	try {
		const res = await fetch(url, options);
		json = await res.json();
	} catch (err) {
		console.log(`Error caught ${err}`);

		return {error: err};
	}

	return json;

};
module.exports.getCookie = function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
};
