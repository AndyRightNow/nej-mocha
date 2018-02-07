const createCwdServer = require('./cwd-server');
const fork = require('child_process').fork;
const path = require('path');
const nodeConfig = require('./../node/config');
const config = require('./../shared/config');
const getPort = require('get-port');

function runServers(userConfig, cb) {
	const libServerProc = fork(path.resolve(__dirname, 'lib-server', 'run.js'), [], {
		cwd: nodeConfig.projectDir,
		stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
	});

	libServerProc.on('message', message => {
		if (message.indexOf(config.CONSTANT.IPC_MESSAGES.SERVER_PORT) === 0) {
			const libServerPort =
				parseInt(message.replace(config.CONSTANT.IPC_MESSAGES.SERVER_PORT, ''), 10) ||
				config.CONSTANT.DEFAULT_LIB_SERVER_PORT;

			getPort({
				port: config.CONSTANT.DEFAULT_CWD_SERVER_PORT,
			}).then(cwdServerPort => {
				let cwdServer = createCwdServer(userConfig, libServerPort, cwdServerPort)
					.listen(cwdServerPort, () => {
						cb(cwdServer, cwdServerPort);
					})
					.on('close', () => {
						libServerProc.send(config.CONSTANT.IPC_MESSAGES.CLOSE_SERVER);
					});
			});
		}
	});
}

module.exports = runServers;
