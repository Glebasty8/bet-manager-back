import { Request, Response } from "express";
import { v1 } from 'uuid';
import { models } from '../../db';

const LiqPay = require('../../liqpay-sdk/lib/liqpay');

class Controller {

    static async payment(req: Request, res: Response) {
        const { data, signature } = req.body;
        const liqpay = new LiqPay(process.env.LIQ_PAY_PUBLIC_KEY, process.env.LIQ_PAY_PRIVATE_KEY);
        const sign = liqpay.str_to_sign(
            process.env.LIQ_PAY_PRIVATE_KEY +
            data +
            process.env.LIQ_PAY_PRIVATE_KEY
        );

        const buf = Buffer.from(data, 'base64').toString();
        let order_id: any = null;
        let parsedOrder: any = null;
        try {
            const { order_id: order } = JSON.parse(buf);
            console.log('order', order);
            order_id = order;
            parsedOrder = JSON.parse(order);
        } catch (err) {
            console.log('err', err);
        }

        if (sign === signature) {
            if (parsedOrder) {
                const { orderId, subscriptionId, userId } = parsedOrder;
                liqpay.api("request", {
                    public_key: process.env.LIQ_PAY_PUBLIC_KEY,
                    action: "status",
                    version: 3,
                    order_id
                }, async (json: any) => {
                    if (json.result === 'ok') {
                        await models.UserSubscription.create({ subscriptionId, userId, orderId })
                    }
                });
            }
        }
    }


    static async subscriptions(req: any, res: Response) {

        const subscriptions = await models.Subscription.findAll();
        const liqpay = new LiqPay(process.env.LIQ_PAY_PUBLIC_KEY, process.env.LIQ_PAY_PRIVATE_KEY);

        const userSubscriptions = subscriptions.map((subscription: any) => {
            const order = {
              subscriptionId: subscription.id,
              userId: req.userId,
              orderId: v1()
            };
            const orderString = JSON.stringify(order)
            const { data, signature } = liqpay.cnb_object({
                public_key: process.env.LIQ_PAY_PUBLIC_KEY,
                version: 3,
                order_id: orderString,
                description: subscription.description,
                amount: subscription.cost,
                currency: 'RUB',
                action: 'pay',
                language: 'ru',
            });

            return {
                ...subscription.dataValues,
                data,
                signature
            }

        });
        res.status(200).send(userSubscriptions);
    }
}

export default Controller;
