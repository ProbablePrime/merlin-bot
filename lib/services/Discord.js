const DiscordAPI = require('discord.js');
const utils = require('../utils/discord.js');
const commandUtils = require('../utils/command.js');
const Registry = require('../commands/Registry');
const commands = require('../commands/discord');
const EventEmitter = require('events');
const util = require('util');
function Discord (config) {
	this.bot = new DiscordAPI.Client();
	this.registry = new Registry();
	Object.keys(commands).forEach((commandString)=> {
		this.registry.register(commandString, commands[commandString](this));
	});
	this.bot.login(config.username, config.password).catch(err => {
		console.log(err);
	});
	this.bot.on('message', this.processMessage.bind(this));
	this.bot.on('ready', (channel) => {
		var channels = this.bot.channels.getAll('name', 'alerts');
		channels.forEach(channel => {
		});
		//this.sendMessage('HOI!, I\'m temmie');
	});
	EventEmitter.call(this);
}
util.inherits(Discord,EventEmitter);
Discord.prototype.processMessage = function(msg) {
	var text = utils.extractMessage(msg);
	console.log('D ' + text);
	if (commandUtils.isCommand(text)) {
		var action = commandUtils.extractCommand(text);
		this.registry.run(action.command, msg.channel, msg.author, action.args);
	}
}

Discord.prototype.sendMessageTo = function(channel,msg) {
		this.bot.sendMessage(channel, msg);
}

Discord.prototype.getServer = function() {

}

module.exports = Discord;
