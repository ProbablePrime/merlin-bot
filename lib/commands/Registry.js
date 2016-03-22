function Registry() {
	this.registry = {};
}

Registry.prototype.register = function(commandString,commandObj) {
	this.registry[commandString] = commandObj;
}

Registry.prototype.run = function() {
	var args = Array.prototype.slice.call(arguments);
	var commandString = args[0];
	var commandArgs = args.slice(1);
	if (this.registry[commandString]) {
		var command = this.registry[commandString];
		command.run.apply(command, commandArgs);
	}
}
module.exports = Registry;
