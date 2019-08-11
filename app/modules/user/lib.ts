const _ = require('lodash');

const userView = (user: any) => {
    return _.pick(user, ['id', 'email', 'userName', 'age', 'role', 'createdAt', 'updatedAt'])

};

export {
    userView
}
