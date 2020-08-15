import {Controller} from '../common/controller';

export class BaseController extends Controller {
    home = (req, res) => {
        this.render(req, res, 'index.ejs', {});
    }
}
