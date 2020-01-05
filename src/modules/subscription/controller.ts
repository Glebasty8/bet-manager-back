import { Request, Response } from "express";

const LiqPay = require('../../liqpay-sdk/lib/liqpay');

class Controller {

    static async payment(req: Request, res: Response) {
        console.log('req.body', req.body);
        const { data, signature } = req.body;
        const liqpay = new LiqPay(process.env.LIQ_PAY_PUBLIC_KEY, process.env.LIQ_PAY_PRIVATE_KEY);
        const sign = liqpay.str_to_sign(
            process.env.LIQ_PAY_PRIVATE_KEY +
            data +
            process.env.LIQ_PAY_PRIVATE_KEY
        );
        if (sign === signature) {
            liqpay.api("request", {
                "action"   : "status",
                "version"  : "3",
                "order_id" : 1211622524
            }, (json: any) => {
                console.log('result', json);
            });
            // const html = liqpay.cnb_form({
            //     'action'         : 'pay',
            //     'amount'         : '1',
            //     'currency'       : 'USD',
            //     'description'    : 'description text',
            //     'order_id'       : '1',
            //     'version'        : '3'
            // });
            // console.log('html', html);
        }
    }


    static async subscriptions(req: Request, res: Response) {

        const subscriptions = [
            { title: 'Subscription for day', value: 200, description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
            { title: 'Subscription for week', value: 400, description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
            { title: 'Subscription for month', value: 1000, description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica', }
        ];
        const liqpay = new LiqPay(process.env.LIQ_PAY_PUBLIC_KEY, process.env.LIQ_PAY_PRIVATE_KEY);

        console.log('liqpay', liqpay);
        const userSubscriptions = subscriptions.map((subscription: any) => {
            const { data, signature } =  liqpay.cnb_object({
                public_key: process.env.LIQ_PAY_PUBLIC_KEY,
                version: 3,
                order_id: 100,
                description: subscription.description,
                amount: subscription.value,
                currency: 'RUB',
                action: 'PAY'
            });

            console.log('data', data);
            console.log('signature', signature);
            return {
                ...subscription,
                data,
                signature
            }

        });
        res.status(200).send(userSubscriptions);
    }
}

export default Controller;
