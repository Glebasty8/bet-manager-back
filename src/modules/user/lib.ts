const _ = require('lodash');

const userView = (user: any) => {
    return _.pick(user, ['id', 'email', 'userName', 'role', 'createdAt', 'updatedAt', 'subscriptions', 'bank', 'dateOfBirth'])
};

export {
    userView
}
