import { Request, Response } from "express";
import * as Sequelize from 'sequelize';
const fs = require('fs');
const handlebars = require('handlebars');

import { models } from '../../../db';
import UserDal from '../user/dal';
import { isValidEmail } from '../../utils';
import { compareWithTrim, encodeToken, hashPassword } from '../../utils/crypt';
import sendEmail from '../../utils/email';
import { userView } from '../user/lib';

const op = Sequelize.Op;

const readHTMLFile = (path: any, callback: any) => {
    fs.readFile(path, { encoding: 'utf-8' }, function (err: any, html: any) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

class Controller {

    static async auth(req: any, res: Response) {
        const { profile } = req;
        res.status(200).send(profile)
    }

    static async login(req: Request, res: Response) {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).send({ ok: false, 'message': 'Some values are missing' });
      }

      if (!isValidEmail(email)) {
          return res.status(400).send({ ok: false, 'message': 'Please enter a valid email address' });
      }

      const user = await UserDal.findUserByEmail(email);

      if (!user) {
          return res.status(400).send({ ok: false, 'message': 'The credentials you provided is incorrect'});
      }

      if (!await compareWithTrim(password, user.password)) {
            return res.status(400).send({ ok: false, 'message': 'The credentials you provided is incorrect' });
      }
      console.log('user', user);

      const token = await encodeToken(userView(user.dataValues));

      return res.status(200).send(token);
    }

    static async register(req: Request, res: Response) {
        const { email, password, ...rest } = req.body;

        if (!email || !password) {
            res.status(400).send({ ok: false, message: 'Some values are missing' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).send({ ok: false, 'message': 'Please enter a valid email address' });
        }

        const user = await UserDal.findUserByEmail(email);

        if (user) {
            res.status(400).send({ ok: false, message: 'User with this email already exists in this system' })
        }

        const hashedPassword = hashPassword(password);

        const newUser = await models.User.create({
            email,
            password: hashedPassword,
            role: "user",
            ...rest,
        }, { returning: true });

        const token = await encodeToken(newUser.dataValues);

        return res.status(201).send(token);
    }

    static async forgotPassword(req: Request, res: Response) {
        const { email } = req.body;

        if (!email) {
            res.status(400).send({ message: 'value is missing' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).send({ ok: false, 'message': 'Please enter a valid email address' });
        }

        const user = await models.User.findOne({ where: { email } });

        if (!user) {
            res.status(400).send({ ok: false, message: 'User with this email not found in system' })
        }

        // generate token
        const token = await encodeToken(email);

        await models.User.update({ recoveryToken: { token, expires: Date.now() + 86400000 }}, { where: { id: user.id }});

        readHTMLFile(__dirname + '/../../templates/forgot-password-email.html', (err: any, html: any) => {
            const context = {
                url: `http://localhost:3000/new-password?token=${token}`,
                name: user.userName
            };
            const template = handlebars.compile(html);
            const htmlToSend = template(context);

            const data = {
                to: user.email,
                template: 'forgot-password-email',
                subject: 'Password help has arrived!',
                html: htmlToSend,
            };

            sendEmail(data)
        });

        return res.sendStatus(200);
    }

    static async resetPassword(req: Request, res: Response) {
        const { newPassword, recoveryToken } = req.body;
        const user = await models.User.findOne({ where: { recoveryToken: { token: recoveryToken, expires: { [op.gt]: Date.now() }} } });

        if (!user) {
            res.status(400).send({ ok: false, message: 'Password reset token is invalid or has expired.' });
        }

        const newHashedPassword = hashPassword(newPassword);

        await models.User.update({ password: newHashedPassword, recoveryToken: null }, { where: { id: user.id }, returning: true });

        readHTMLFile(__dirname + '/../../templates/reset-password-email.html', (err: any, html: any) => {
            const context = {
                name: user.userName
            };
            const template = handlebars.compile(html);
            const htmlToSend = template(context);

            const data = {
                to: user.email,
                template: 'forgot-password-email',
                subject: 'Password Reset Confirmation',
                html: htmlToSend,
            };

            sendEmail(data)
        });

        return res.sendStatus(200);
    }
}

export default Controller;
