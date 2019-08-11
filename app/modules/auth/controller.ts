import { Request, Response} from "express";
import { models } from '../../../db';
import { isValidEmail } from '../../utils';
import { compareWithTrim, encodeToken, hashPassword } from '../../utils/crypt';
import { userView } from '../user/lib';

class Controller {

    static async auth(req: any, res: Response) {
        const { profile } = req;
        res.status(200).send(profile)
    }

    static async login(req: Request, res: Response) {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).send({ 'message': 'Some values are missing' });
      }

      if (!isValidEmail(email)) {
          return res.status(400).send({ 'message': 'Please enter a valid email address' });
      }

      const user = await models.User.findOne({ where: { email } }, { returning: true });

      if (!user) {
          return res.status(400).send({'message': 'The credentials you provided is incorrect'});
      }

      if (!compareWithTrim(user.password, password)) {
            return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
      }

      const token = await encodeToken(user.dataValues);

      return res.status(200).send(token);

    }

    static async register(req: Request, res: Response) {
        const { email, password, ...rest } = req.body;

        if (!email || !password) {
            res.status(400).send({ message: 'Some values are missing' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }

        const user = await models.User.findOne({ where: { email } });
        if (user) {
            res.status(400).send({ message: 'User with this email already exists in this system' })
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

    static async resetPassword(req: Request, res: Response) {
        const users = await models.User.findAll();
        return res.send(users);
    }

}

export default Controller;
