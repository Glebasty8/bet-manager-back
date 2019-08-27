import { models } from '../../../db';

const withInclude = [
    // { model: models.Subscription, as: 'subscription' }
];

const findUserByEmail = async (email) => {
    return models.User.findOne({ where: { email }, include: withInclude })
};

const findUsers = async () => {
  return models.User.findAll({ include: withInclude })
};

const findUserById = async (userId) => {
  return models.User.findByPk(userId);
};

export default {
    findUserByEmail,
    findUsers,
    findUserById
};
