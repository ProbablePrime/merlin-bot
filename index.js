var Discord = require('./lib/services/Discord.js');
var Beam = require('./lib/services/Beam.js');
const Watcher = require('./lib/Watcher');
var config = require('./config/default.json');

var disc = new Discord(config.discord);
var beam = new Beam(config.beam);
var watcher = new Watcher(beam);
console.log('HELLO');
console.log(disc.on);

disc.on('status', (service,channel,user,args) => {
	service.sendMessageTo(channel, 'I am watching the following channels: ');
});

disc.on('watch', (service,channel,user,args) => {
	if(!args) {
		service.sendMessageTo(channel, '!watch <channelName>');
	}
	var channelName = args[0];
	watcher.watchChannel(channelName, service, channel, user);
});
