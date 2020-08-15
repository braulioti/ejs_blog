import {Router} from '../common/router';
import {Sequelize} from 'sequelize-typescript';
import {BaseController} from '../controller/base.controller';

class BaseRouter extends Router {
    applyRoutes(application: any, sequelize: Sequelize) {
        const baseController = new BaseController();

        this.basePath = '/';
        // this.model = ModelClass;
        this.includes = [];
        this.setSequelize(sequelize);
        this.setController(baseController);

        application.get(`${this.basePath}`, baseController.home);
    }
}

export const baseRouter = new BaseRouter();
