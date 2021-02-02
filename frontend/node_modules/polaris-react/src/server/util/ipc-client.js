/**
 * **OLD** Not in use. Old Bot emulator.
 * @type {IPCModule}
 */

const IPC = require('node-ipc');

IPC.config.id = 'polarisClient';
IPC.config.retry = 1500;
IPC.config.silent = true;

IPC.connectTo('polarisServer', function() {
	const ws = IPC.of.polarisServer;
	ws.on('connect', function() {
		console.log('IPC: Connected!');
	});
	ws.on('disconnect', function() {
		console.log(`IPC: Disconnected! Attempting re-connection.`);
	});

	ws.on('error', function(error){
		if (error.code === 'ENOENT') {
			console.log(`IPC: Server has disconnected. Error caught.`);
		} else {
			throw new Error(error);
		}
	});

	ws.on('botCheck', function(msg) {
		msg = JSON.parse(msg);

		// Will need to actually add in bot support in future.
		var validServers = {
			"375406825794699264": true,
			"460089629073211402": true,
			1: true,
		};
		if (validServers[msg.data.guildId]) {
			sendObject(ws, 'botCheckRes', {data: true, _id: msg._id});
		} else {
			sendObject(ws, "botCheckRes", {data: false, _id: msg._id});
		}
	});

	ws.on('getRoles', function(msg) {
		msg = JSON.parse(msg);

		// Will need to actually add in bot support in future. Roles are in Collections. Use for of collection.values() and remove useless values.
		const serverRoles =
			[
				{ id: '375407217232445442', name: 'Dyno', color: 0 },
				{ id: '376755089982881802', name: 'Developer', color: 433288 },
				{ id: '376785020058206208', name: 'Testing-bot', color: 0 },
				{ id: '392071324601942017', name: 'Beta tester', color: 3447003 },
				{ id: '393891655750516737',
					name: 'Management Officer',
					color: 1146986 },
				{ id: '397434305929805825',
					name: 'Roverify dev',
					color: 10038562 },
				{ id: '398424041104343050', name: 'Muted', color: 8487814 },
				{ id: '451056912247816230', name: 'Polaris', color: 1752220 },
				{ id: '452141151449776139',
					name: 'Support staff',
					color: 12745742 },
				{ id: '454294496566444033',
					name: 'Head of Graphics',
					color: 2067276 },
				{ id: '456143641568870430', name: 'Verified', color: 0 },
				{ id: '456143643863023627', name: 'Unverified', color: 0 },
				{ id: '458686625027850253', name: 'Supporter', color: 15158332 },
				{ id: '460124083313704971', name: 'Patreon', color: 0 },
				{ id: '460124174665515038', name: 'Bots', color: 3066993 },
				{ id: '460129485241712691', name: 'Patreon', color: 2123412 },
				{ id: '471795658077110302', name: 'Moderator', color: 16776960 },
				{ id: '472856170537680897', name: 'Epic', color: 12720152 },
				{ id: '472862836964458497', name: 'NSFW bot', color: 0 },
				{ id: '473043493133090826', name: 'MEE6', color: 0 },
				{ id: '473089393121558528', name: 'Allow ping', color: 0 },
				{ id: '474978839387308033',
					name: 'Discord Support Bot',
					color: 0 } ];

		// lol meme doesnt actually use guild id at all im so savage!
		sendObject(ws, 'getRolesRes', {data: serverRoles, _id: msg._id});

	});
});
const sendObject = (ws, type, object) => ws.emit(type, JSON.stringify(object));
