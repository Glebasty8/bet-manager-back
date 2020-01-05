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
                "order_id" : '1'
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

}

export default Controller;
