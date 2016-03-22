var DiscordCommand = require('../DiscordCommand');
module.exports = function(service) {
	return new DiscordCommand(service, 'status', ['admin','mod'], (service, channel, user, args ) =>{
		service.sendMessageTo(channel, 'Hello');
	})
}
