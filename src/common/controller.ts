import {Sequelize} from 'sequelize-typescript';

export abstract class Controller {
    public sequelize: Sequelize;
    public model: any;
    public includes: any[] = [];
    public basePath: string;

    constructor() {
    }

    render(req, res, viewFile: string, options) {
        res.render(viewFile, options);
    }
}
