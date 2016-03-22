const WsabiClient = require('wsabi-client-bacon');
const EventEmitter = require('events');
const util = require('util');
const Promise = require('bluebird');

function Beam(config) {
	this.wsabi = new WsabiClient('wss://realtime.beam.pro');
	this.wsabi.liveUrl = '/api/v1/live';
	EventEmitter.call(this);
}

util.inherits(Beam, EventEmitter);

Beam.prototype.getChannel = function(channelName) {
	return this.wsabi.get(`/api/v1/channels/${channelName}`);
}

Beam.prototype.watchChannel = function(channelName) {
	return this.getChannel(channelName).then(channel => {
		if (this.wsabi.subscriptions[`channel:${channel.id}:update`]) {
			return;
		}
		this.wsabi.live(`channel:${channel.id}:update`).then( (res) => {
			res.onValue((value)=> {
				var extraEvents = [];
				console.log(value);
				if(value.online !== undefined) {
					if (channel.online && !value.online) {
						extraEvents.push('channel-offline');
					} else if(!channel.online && value.online) {
						extraEvents.push('channel-online');
					}
				}
				channel = Object.assign({}, channel, value);
				extraEvents.forEach(event => this.emit(event, channel));
				this.emit('channel-update', channel);
			});
		});
		this.wsabi.live(`tetris:${channel.id}:connect`).then( (res) => {
			res.onValue((value)=> {
				this.emit('tetris-connect', channel);
			});
		});
		this.wsabi.live(`tetris:${channel.id}:disconnect`).then( (res) => {
			res.onValue((value)=> {
				this.emit('tetris-disconnect', channel);
			});
		});
	});
};

Beam.prototype.unWatchChannel = function(channelName) {
	this.getChannel(channelName).then(channel => {
		this.wsabi.delete('/api/v1/live',{
			slug: [`tetris:${channel.id}:connect`, `tetris:${channel.id}:disconnect`, `channel:${channel.id}:update`]
		})
	});
}

module.exports = Beam;
