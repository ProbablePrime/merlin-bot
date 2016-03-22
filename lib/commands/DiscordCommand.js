var Command = require('./Command');
var discordUtils = require('../utils/discord');
var util = require('util');

function DiscordCommand() {
	DiscordCommand.super_.apply(this, arguments);
}
util.inherits(DiscordCommand, Command);

DiscordCommand.prototype.checkPerms = function(service, channel, user, perms) {
	const server = channel.server;
	const userPerms = server.rolesOf(user).map(role => role.name.toLowerCase());
	return perms.some(perm => {
		return userPerms.indexOf(perm.toLowerCase()) !== -1;
	})
}

DiscordCommand.prototype.extractUsername = function(user) {
	return discordUtils.extractUsername(user);
}
module.exports = DiscordCommand;
