import { Request, Response} from "express";
import { models } from '../../../db';

class Controller {

    static async getAll(req: Request, res: Response) {
        const users = await models.User.findAll();
        return res.status(200).send(users);
    }

    static async create(req: Request, res: Response) {
        const user = await models.User.create(req.body, { returning: true });
        return res.status(201).send(user.dataValues);
    }

    static async get(req: Request, res: Response) {
        const user = await models.User.findByPk(req.params.userId);
        return res.status(200).send(user);
    }

    static async update(req: Request, res: Response) {
        const bet = await models.Bet.update(req.body, { returning: true });
        return res.status(200).send(bet);
    }

    static async remove(req: Request, res: Response) {
        await models.User.destroy({ where: { id: req.params.userId } });
        return res.sendStatus(204);
    }

}

export default Controller;
