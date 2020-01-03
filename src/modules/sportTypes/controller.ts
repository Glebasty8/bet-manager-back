import { Request, Response} from "express";
import { models } from '../../db';

class Controller {

    static async getAll(req: Request, res: Response) {
        const sportTypes = await models.SportType.findAll();
        return res.status(200).send(sportTypes);
    }

}

export default Controller;
