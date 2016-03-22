const utils = {
	isCommand(msg) {
		return msg.charAt(0) === '!';
	},
	extractCommand(msg) {
		var parts = msg.split(' ');
		var command = parts[0];
		command = command.replace('!','');
		var args = parts.slice(1);
		console.log(args);
		return {
			command,
			args
		}
	}
}

module.exports = utils;
