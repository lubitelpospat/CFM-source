const { apiFetch }   = require('./apiFetch.js');

var newSettings = {};

// i dont even think this can be populated with > 1 but whatever
const settingsStorage = {};

// Connects to the popup. This could 100% be done better.
var onEditFunc;
function setEditFunc(func){
	onEditFunc = func;
}

function change () {
	if (onEditFunc) {
		onEditFunc(true);
	}
}

// hmph! are you having a nice look through my source??
async function save () {
	let res = await apiFetch(`/api/servers/${window._discordServerId}`, {
		method: "post",
		body: JSON.stringify({
			newSetting: newSettings
		}),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});
	if (res.error) {
		throw new Error(res.error.message);
	}
	if (res.newSettings) {
		settingsStorage[window._discordServerId] = res.newSettings;
	} else {
		console.error(res);
	}
	console.log(`Settings updated.`);

	newSettings = {};
	onEditFunc(false);
}


async function getSettings (id) {
	if (id && !window._discordServerId) window._discordServerId = id;
	id = id ? id : window._discordServerId;

	if (settingsStorage[id]) {

		return settingsStorage[id];
	}
	const res = await apiFetch(`/api/servers/${id}`);

	if (res.error) {
		if (res.error.redirect) {

			if (res.error.redirect.newTab) {
				//window.open(res.error.redirect.url, '_blank');
				window.location.href = res.error.redirect.url;
			} else {
				window.location.href = res.error.redirect.url;
			}
			return;
		} else {

			return res;
		}
	}
	// Type fixes. Should be fixed in the db too.
	if (res.mainGroup) {
		if (typeof res.mainGroup.ranksToRoles !== "boolean" && res.mainGroup.ranksToRoles !== undefined) {
			res.mainGroup.ranksToRoles = res.mainGroup.ranksToRoles === "true" ? true : false;
		}
		if (typeof res.mainGroup.id !== "number" && res.mainGroup.id !== undefined) {
			res.mainGroup.id = parseInt(res.mainGroup.id, 10);
		}
	}
	if (!res.subGroups) {
		res.subGroups = [];
	}
	settingsStorage[window._discordServerId] = res;
	return res;
}


// Returns true: Exists.
function checkId(groupId) {
	groupId = parseInt(groupId, 10);
	let current = settingsStorage[window._discordServerId];
	if (current) {
		if (current.mainGroup) {
			if (parseInt(current.mainGroup.id, 10) === parseInt(groupId, 10)) {
				return true;
			}
		}
		if (current.subGroups) {
			for (let i=0; i < current.subGroups.length; i++) {
				if (parseInt(current.subGroups[i].id, 10) === groupId) {
					return true;
				}
			}
		}
		return false;
	}

}


function changeAutoVerify(newVal) {
	let current = settingsStorage[window._discordServerId];
	if (current) {
		if (current.autoVerify !== newVal) {
			change();
			newSettings.autoVerify = newVal;
		}
	}
}

function changePrefix(newVal) {
	if (!newVal || newVal === "") newVal = ".";
	let current = settingsStorage[window._discordServerId];
	if (current) {
		if (current.prefix !== newVal) {
			change();
			newSettings.prefix = newVal;
			return true;
		}
	}
}
function changeNickname(newVal) {
	let current = settingsStorage[window._discordServerId];
	if (current) {
		if (current.nicknameTemplate !== newVal) {
			change();
			newSettings.nicknameTemplate = newVal;
			return true;
		}
	}
}


function editMainGroup(newVal) {
	let current = settingsStorage[window._discordServerId];
	if (current) {

		if (!current.mainGroup && !newSettings.mainGroup) current.mainGroup = {};
		if (!newSettings.mainGroup)	newSettings.mainGroup = {};

		if (newVal.id) {
			if (current.mainGroup.id !== newVal.id) newSettings.mainGroup.id = newVal.id; change();
		}
		if (newVal.ranksToRoles !== undefined) {
			if (newVal.ranksToRoles !== current.mainGroup.ranksToRoles) newSettings.mainGroup.ranksToRoles = newVal.ranksToRoles; change();
		}
		if (newVal.binds) {
			let hasBeenEdited = false;
			if (current.mainGroup.binds) {
				// Main group already has binds. Add new.
				for (let counter = 0; counter < newVal.binds.length; counter++) {
					// Searches and adds new bind if it doesn't already exist.
					const currentBind = newVal.binds[counter];
					const added = addBind(current.mainGroup.binds,  currentBind);
					if (added) {
						hasBeenEdited = true;
					}
				}
			} else {
				// It doesn't. Just set em.
				newSettings.mainGroup.binds = newVal.binds;
				change();
				return;
			}
			if (hasBeenEdited) {
				change();
				newSettings.mainGroup.binds = current.mainGroup.binds;
			}

		}
	}
}

// Subgroup
function editGroup(id, newVal) {
	console.log("EDIT SUB")
	let current = settingsStorage[window._discordServerId];
	if (!newSettings.subGroups) newSettings.subGroups = current.subGroups || [];
	if (current) {
		let pos;
		if (current.subGroups) {
			for (let count = 0; count <  current.subGroups.length; count++) {
				if (parseInt(current.subGroups[count].id, 10) === parseInt(id, 10)) {
					pos = count;
				}
			}
		}
		if (pos === undefined) {
			// Check main
			if (current.mainGroup && parseInt(current.mainGroup.id,10) === parseInt(id, 10)) {
				// It matches. Edit it instead.
				editMainGroup(newVal);
				return;
			}
		}
		const target = pos !== undefined ? current.subGroups[pos]: {};
		if (id) target.id = parseInt(id);
		if (newVal.ranksToRoles !== undefined) target.ranksToRoles = newVal.ranksToRoles;

		if (newVal.binds) {
			// If current settings has binds
			if (target.binds) {
				let hasBeenEdited = false;
				for (let counter = 0; counter < newVal.binds.length; counter++) {
					// Searches and adds new bind if it doesn't already exist.
					const currentBind = newVal.binds[counter];
					const added = addBind(target.binds,  currentBind);
					if (added) {
						hasBeenEdited = true;
					}
				}
				if (hasBeenEdited) change();
			} else {
				// doesn't already exist. just set it.
				target.binds = newVal.binds;
				change();
			}


		}

		if (pos !== undefined) {
			// found. Locate and set it.
			updateSub(id, target);
			change();

		} else if (current.mainGroup &&current.mainGroup.id === id) {
			// It's the maingroup
			editMainGroup(newVal);
		} else {
			console.log(`Adding subgroup ${target.id}`);
			newSettings.subGroups.push(target);
			change();
		}

	}
}
// for editMainGroup and editGroup: Check for bind existance. Add if does not exist.
function addBind (binds, newBind) {
	for (let counter = 0; counter < binds.length; counter++) {
		const current = binds[counter];
		if (current.role === newBind.role && current.rank === newBind.rank && current.exclusive === newBind.exclusive) {
			return false; // no add
		}
	}
	// It's not been found.
	binds.push(newBind);
	return true;
}

function deleteBind (id, bindToDelete) {
	let current = settingsStorage[window._discordServerId];
	if (current) {
		let pos;
		if (current.subGroups) {
			for (let count = 0; count <  current.subGroups.length; count++) {
				if (parseInt(current.subGroups[count].id, 10) === parseInt(id, 10)) {
					pos = count;
				}
			}
		}
		//Sub found!
		if (pos !== undefined) {
			const subGroup = current.subGroups[pos];
			for (let counter = 0; counter < subGroup.binds.length; counter++) {
				const current = subGroup.binds[counter];
				if (current.role === bindToDelete.role && current.rank === bindToDelete.rank && current.exclusive === bindToDelete.exclusive) {
					// It's been found.
					subGroup.binds.splice(counter, 1);
					return updateSub(id, subGroup);
				}
			}
			// It's not been found.
			return false;
		} else {
			// try main
			if (current.mainGroup.id === id) {
				const group = current.mainGroup;
				for (let counter = 0; counter < group.binds.length; counter++) {
					const current = group.binds[counter];
					if (current.role === bindToDelete.role && current.rank === bindToDelete.rank && current.exclusive === bindToDelete.exclusive) {
						// It's been found.
						group.binds.splice(counter, 1);
						newSettings.mainGroup = group;
						return change();
					}
				}
			} else throw new Error ("Group not found");
		}
	}


}
function updateSub(id, newContent) {
	if (newSettings.subGroups) {
		for (let c = 0; c< newSettings.subGroups.length; c++) {
			if (parseInt(newSettings.subGroups[c].id, 10) === parseInt(id, 10)) {
				// it matches. Update it.
				// This sets it to itself + new properties. newContent overwrites old, as it comes after.
				newSettings.subGroups[c] =  { ...newSettings.subGroups[c], ...newContent };
				change();
			}
		}
	} else {
		newSettings.subGroups = [ newContent ];
		change();
	}
}
function setMainGroup (newId) {
	if (!newId) throw new Error('No id for set main group');
	// Find sub group with that id
	const current = settingsStorage[window._discordServerId];
	if (current) {
		let pos = 0;
		if (current.subGroups) {
			for (let count = 0; count < current.subGroups.length; count++) {
				const group = current.subGroups[count];
				if (group.id == newId) {
					pos = count;
				}
			}
			const newMain = current.subGroups.splice(pos, 1)[0];
			// Push current mainGroup to subgroups
			if (current.mainGroup && current.mainGroup.id) {
				current.subGroups.push(current.mainGroup);
			}
			// Set new main group
			newSettings.mainGroup = newMain;
			newSettings.subGroups = current.subGroups;
			change();
			return true;
		}
	}
}


function deleteGroup(groupId) {
	const current = settingsStorage[window._discordServerId];
	if (current) {
		// Check if its the main group
		if (current.mainGroup && current.mainGroup.id == groupId) {
			// delete it and set subGroups[0] as main
			if (current.subGroups && current.subGroups.length !== 0) {

				const newMain = current.subGroups.splice(0, 1)[0];
				newSettings.subGroups = current.subGroups;
				newSettings.mainGroup = newMain;

			} else {
				newSettings.mainGroup = {};
			}
			change();
		} else {
			let groupPos;
			// Its not main group. Find it in sub groups and splice it.
			for (var count = 0; count < current.subGroups.length; count++) {

				if (current.subGroups[count].id == groupId) {
					groupPos = count;
				}
			}
			if (groupPos !== undefined) {
				current.subGroups.splice(groupPos, 1);
				newSettings.subGroups = current.subGroups;
				change();
			}
		}


	}

}


async function send (id) {
	let res = await apiFetch(`/servers/${id}/`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json;",
		},
	});
	if (!res.ok) {
		return {error: {status: res.status, message: await res.json().error.message}};
	}
	res = await res.json();
	if (res.success) return true;
}
export {
	send,
	changeAutoVerify,
	getSettings,
	changePrefix,
	editMainGroup,
	editGroup,
	deleteBind,
	setMainGroup,
	deleteGroup,
	changeNickname,
	setEditFunc as editEvent,
	save,
	checkId
};
