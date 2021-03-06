import { Request, Response} from "express";
const {
    Telegram
} = require('telegraf');
const moment = require('moment');
const _ = require('lodash');
import { models } from '../../db';

const tg = new Telegram(process.env.BOT_TOKEN)

class Controller {

    static async getAll(req: Request, res: Response) {
        const bets = await models.Bet.findAll();
        return res.status(200).send(bets);
    }

    static async create(req: Request, res: Response) {
        const bet = await models.Bet.create(req.body, { returning: true });
        const { eventDate, sportTypeId, competition, forecast, coefficient, betAmount, competitors, isFree } = bet;
        const eventDateFormatted = moment(eventDate).tz('Europe/Moscow').format('DD-MM-YYYY HH:mm');
        const sportType = await models.SportType.findByPk(sportTypeId);
        const sportTypeName = _.get(sportType, 'name', '');
        const competitorsFormatted = competitors.reduce((acc: any, curr: any) => {
            return acc ? `${acc} - ${curr}` : curr;
        }, '');
        if (isFree) {
            tg.sendMessage(process.env.PUBLIC_GROUP_ID, `Начало матча: ${eventDateFormatted} (МСК)\n${sportTypeName ? sportTypeName.split(' ')[0] : ''}. ${competition} \n${competitorsFormatted}: ${forecast} - ${coefficient}\nРекомендуемая сумма ставки: ${betAmount}\nУдачи! 🍀`);
        } else {
            // send message to the private chat
            tg.sendMessage(process.env.PRIVATE_GROUP_ID, `Начало матча: ${eventDateFormatted} (МСК)\n${sportTypeName ? sportTypeName.split(' ')[0] : ''}. ${competition} \n${competitorsFormatted}: ${forecast} - ${coefficient}\nРекомендуемая сумма ставки: ${betAmount}\nУдачи! 🍀`);
        }
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
