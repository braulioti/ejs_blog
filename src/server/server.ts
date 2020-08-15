import {Router} from '../common/router';
import {LiquibaseServer} from './liquibase.server';
import * as path from 'path';
import {Sequelize} from 'sequelize-typescript';
const express = require('express');
const app = express();

export class Server {
    environment: any;
    application: any = app;
    sequelize: Sequelize;

    setEnvironment(environment: any) {
        this.environment = environment;
    }

    initializeDb(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                this.sequelize = new Sequelize({
                    database: this.environment.db.database,
                    dialect: 'postgres',
                    username: this.environment.db.user,
                    password: this.environment.db.password,
                    host: this.environment.db.host,
                    port: this.environment.db.port,
                    //logging: console.log,
                    logging: false,
                    storage: ':memory:',
                    modelPaths: [__dirname + '/models/public/*.model.ts'],
                    define: {
                        timestamps: false,
                        schema: 'public'
                    },
                    dialectOptions: {
                        useUTC: false
                    },
                    timezone: '-03:00'
                });

                this.sequelize.addModels([]);

                resolve(this.sequelize);
            } catch(e) {
                reject(e);
            }
        });
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
                    router.applyRoutes(this.application, this.sequelize);
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
        return this.initializeDb().then(() =>
            this.runLiquibase().then(() =>
                this.initRoutes(routers).then(() => this)
            )
        );
    }
}
