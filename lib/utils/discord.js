const utils = {
	extractMessage(message) {
		return message.cleanContent;
	},
	extractUsername(user) {
		return user.username;
	}
}

module.exports = utils;
