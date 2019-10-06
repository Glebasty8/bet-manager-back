import { Request, Response} from "express";
import { models } from '../../db';

class Controller {

    static async getAll(req: Request, res: Response) {
        const bets = await models.Bet.findAll();
        return res.status(200).send(bets);
    }

    static async create(req: Request, res: Response) {
        const bet = await models.Bet.create(req.body, { returning: true });
        return res.status(201).send(bet);
    }

    static async get(req: Request, res: Response) {
        const bet = await models.Bet.findByPk(req.params.betId);
        return res.status(200).send(bet);
    }

    static async remove(req: Request, res: Response) {
        await models.Bet.destroy({ where: { id: req.params.betId } });
        return res.sendStatus(204);
    }

    static async update(req: Request, res: Response) {
        await models.Bet.update(req.body, { where: { id: req.params.betId }})
        const updatedBet = await models.Bet.findByPk(req.params.betId);
        return res.status(200).send(updatedBet);
    }

}

export default Controller;
