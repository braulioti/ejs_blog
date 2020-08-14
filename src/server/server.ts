import {Router} from '../common/router';
import {LiquibaseServer} from './liquibase.server';
import * as path from 'path';
const express = require('express');
const app = express();

export class Server {
    environment: any;
    application: any = app;

    setEnvironment(environment: any) {
        this.environment = environment;
    }

    runLiquibase(): Promise<any> {
        console.log('Running Liquibase...');

        const server: LiquibaseServer = new LiquibaseServer(this.environment);

        return new Promise( (resolve, reject) =>
            server.runLiquibase().then(() => {
                resolve(null);
            }).catch((err) => {
                reject(err);
            })
        );
    }

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application.use('/assets',
                    express.static(`${__dirname}/../../views/default/assets`));
                this.application.set('view engine', 'ejs');
                this.application.set('views', path.join(__dirname,
                    '/../../views/default'));

                // routes
                for (const router of routers) {
                    router.applyRoutes(this.application);
                }

                this.application.listen(this.environment.server.port, () => {
                    resolve(this.application);
                });
            } catch (error) {
                reject(error);
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.runLiquibase().then(() =>
            this.initRoutes(routers).then(() => this)
        );
    }
}
