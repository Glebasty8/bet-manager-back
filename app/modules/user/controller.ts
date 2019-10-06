import { Request, Response} from "express";
import { models } from '../../db';

import UserDal from './dal';

class Controller {

    static async getAll(req: Request, res: Response) {
        const users = await UserDal.findUsers();
        return res.status(200).send(users);
    }

    static async create(req: Request, res: Response) {
        const user = await models.User.create(req.body, { returning: true });
        return res.status(201).send(user.dataValues);
    }

    static async get(req: Request, res: Response) {
        const user = await UserDal.findUserById(req.params.userId);
        return res.status(200).send(user);
    }

    static async update(req: Request, res: Response) {
        const user = await models.User.update(req.body, { where: { id: req.params.userId }, returning: true });
        return res.status(200).send(user);
    }

    static async remove(req: Request, res: Response) {
        await models.User.destroy({ where: { id: req.params.userId } });
        return res.sendStatus(204);
    }

}

export default Controller;
