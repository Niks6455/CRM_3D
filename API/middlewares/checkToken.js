import jwt from '../utils/jwt.js';

 async function general(req, res, next) {
    const authorization = req.headers.authorization;
    if (authorization?.split(' ')[0] !== 'Bearer') throw new Error('token');
    try {
        req.user = jwt.verify(authorization.split(' ')[1]);
    } catch (e) {
        throw new Error(e.message);
    }
    next();
}



export default {general}