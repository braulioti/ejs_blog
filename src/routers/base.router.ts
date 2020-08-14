import {Router} from '../common/router';

class BaseRouter extends Router {
    applyRoutes(application: any) {
        application.get('/', function(req, res) {
            res.render('index.ejs');
        });
    }
}

export const baseRouter = new BaseRouter();
