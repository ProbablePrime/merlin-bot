const DiscordCommand = require('./DiscordCommand');
const util = require('util');
function DiscordEmitterCommand(service, command, perms) {
	DiscordEmitterCommand.super_.apply(this, [service, command, perms, this.emit.bind(this)]);
}
util.inherits(DiscordEmitterCommand, DiscordCommand);

DiscordEmitterCommand.prototype.emit = function() {
	this.service.emit(this.command, ...arguments);
}


module.exports = DiscordEmitterCommand;
