const createServer = require('./index');
const getPort = require('get-port');
const config = require('./../../shared/config');

let runningServer;

process.on('message', message => {
	if (message === config.CONSTANT.IPC_MESSAGES.CLOSE_SERVER && runningServer) {
		runningServer.close();
		process.exit(0);
	}
});

getPort({
	port: config.CONSTANT.DEFAULT_LIB_SERVER_PORT,
}).then(port => {
	runningServer = createServer().listen(port, () => {
		if (process.send) {
			process.send(`${config.CONSTANT.IPC_MESSAGES.SERVER_PORT}${port}`);
		}
	});
});
