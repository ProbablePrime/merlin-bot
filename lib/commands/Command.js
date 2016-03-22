function Command(service, command, perms, func) {
	this.service = service;
	this.command = command;
	this.perms = perms;
	this.func = func
}

Command.prototype.run = function(channel, user, args) {
	var username = this.extractUsername(user);
	if (!this.checkPerms(this.service, channel, user, this.perms)) {
		this.service.sendMessageTo(channel,`${username} is not allowed to do that`);
		return;
	}
	this.func(this.service, channel, user, args);
}

Command.prototype.checkPerms = function(service, channel, user, perms) {
	return true;
}
Command.prototype.extractUsername = function(user) {
	return '';
}
module.exports = Command;
