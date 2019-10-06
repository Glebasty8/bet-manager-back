import { decodeToken } from '../utils/crypt';

const extractToken = (req: any, res: any, next: any) => {
    let token = null;
    if (req.headers && req.headers.authorization) {
        let parts = req.headers.authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }

    if (!token) {
        return next();
    }

    decodeToken(token)
        .then((user: any) => {
            req.userId = user && user.id;
            next()
        })
        .catch(() => res.status(403).send('Token parse error'))
};


export default extractToken;
