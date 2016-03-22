function Watcher(beam) {
	this.beam = beam;
	this.channelCache = {};
	this.watchers = {};
	this.beam.on('channel-online', this.onChannelOnline.bind(this));
	this.beam.on('channel-offline', this.onChannelOffline.bind(this));
	this.beam.on('tetris-connect', this.onTetrisConnect.bind(this))
	this.beam.on('tetris-disconnect', this.onTetrisDisconnect.bind(this))
}
Watcher.prototype.onChannelOffline = function(channel) {
	this.sendUpdateToWatchers(channel, `${channel.token} offline!`)
},
Watcher.prototype.onChannelOnline = function(channel) {
	this.sendUpdateToWatchers(channel, `${channel.token} online!`)
},
Watcher.prototype.onTetrisConnect = function(channel) {
	this.sendUpdateToWatchers(channel, `${channel.token} interactive connected!`)
}
Watcher.prototype.onTetrisDisconnect = function(channel) {
	this.sendUpdateToWatchers(channel, `${channel.token} interactive disconnected!`)
}

Watcher.prototype.sendUpdateToWatchers = function(channel, update) {
	var watchers = this.watchers[channel.token.toLowerCase()];
	if (!watchers) {
		return;
	}
	watchers.forEach((watcher) => {
		var mention = '@' + watcher.user.username;
		if (typeof watcher.user.mention === "function") {
			mention = watcher.user.mention();
		}
		watcher.service.sendMessageTo(watcher.channel, `${mention} : ${update}`);
	})
}
Watcher.prototype.addWatcherTarget = function(channelName, target) {
	channelName = channelName.toLowerCase();
	if (!this.watchers[channelName]) {
		this.watchers[channelName] = [];
	}
	this.watchers[channelName].push(target);
}

Watcher.prototype.watchChannel = function(channelName, service, channel, user) {
	this.beam.watchChannel(channelName).then(() => {
		service.sendMessageTo(channel, `I am now watching ${channelName}`);
		this.addWatcherTarget(channelName, {service, channel,user});
	},
	err => {
		service.sendMessageTo(channel, `I can't watch that channel because: ${err.body}`);
	}
	);
}
Watcher.prototype.unWatchChannel = function(channelName, service, channel, user) {

}

module.exports = Watcher;
