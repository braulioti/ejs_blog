import {Sequelize} from 'sequelize-typescript';
import {Controller} from './controller';

export abstract class Router {
    abstract applyRoutes(application: any, sequelize: Sequelize);

    public basePath: string;
    public model: any;
    public sequelize: Sequelize;
    public includes: any[] = [];
    public models: any[] = [];

    private controller: Controller;

    setSequelize(sequelize: Sequelize) {
        this.sequelize = sequelize;
    }

    setController(controller: Controller) {
        this.controller = controller;

        this.controller.sequelize = this.sequelize;
        this.controller.basePath = this.basePath;
        this.controller.includes = this.includes;
        this.controller.model = this.model;
    }
}
