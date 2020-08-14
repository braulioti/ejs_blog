import {environment} from './common/environments';
import {Server} from './server/server';
import {baseRouter} from './routers/base.router';

const server = new Server();

server.setEnvironment(environment);

server.bootstrap([
    baseRouter
]).then((server) => {
    console.log('Server is listening on port ' + server.environment.server.port);
}).catch((error) => {
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
});
