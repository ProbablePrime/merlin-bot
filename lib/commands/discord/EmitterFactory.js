var DiscordEmitterCommand = require('../DiscordEmitterCommand');
module.exports = function(event, perms) {
	return function(service) {
		console.log(perms)
		return new DiscordEmitterCommand(service, event, perms);
	}
}
