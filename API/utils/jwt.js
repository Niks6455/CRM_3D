import jwt from 'jsonwebtoken';


const { JWT_SECRET } = process.env
const jwtOptions = { expiresIn: '6h', algorithm: 'HS256' };
export default {
    generate(payload = {}) {
        return { jwt: jwt.sign(payload, JWT_SECRET, jwtOptions) };
    },
    // Проверка ключа и возвращение декодированного payload
    verify(key) {
        return jwt.verify(key, JWT_SECRET, jwtOptions);
    },
    // декодирование токена
    decode(token) {
        return jwt.decode(token);
    },
};

