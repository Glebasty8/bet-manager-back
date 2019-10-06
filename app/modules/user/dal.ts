import { models } from '../../../db';

const withInclude = [
    { model: models.Subscription, as: 'subscription' }
];

const findUserByEmail = async (email: string) => {
    return models.User.findOne({ where: { email }, include: withInclude })
};

const findUsers = async () => {
  return models.User.findAll({ include: withInclude })
};

const findUserById = async (userId: any) => {
  return models.User.findByPk(userId);
};

export default {
    findUserByEmail,
    findUsers,
    findUserById
};
