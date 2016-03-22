var EmitterFactory = require('./EmitterFactory');
module.exports = {
	hello: require('./hello.js'),
	status: EmitterFactory('status',['admin','mod','merlin','failure']),
	watch: EmitterFactory('watch',['admin','mod','merlin','failure']),
	unwatch: EmitterFactory('unwatch',['admin','mod'])
}
