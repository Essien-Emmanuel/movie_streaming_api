import jwt from 'jsonwebtoken';


type JWTPayload = {
    user: Record<string, any>;
    flag: any;
    timestamp: Date;
}

export const generateToken = (payload: JWTPayload, expiresIn: string = '1000h') => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, 'secretKey', { expiresIn }, (error, encodedToken) => {
            if (error) return reject(error);
            return resolve(encodedToken);
        });
    });
}

export const verifyToken = (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'secretkey', (error, decodedToken) => {
            if (error) return reject(error);
            return resolve(decodedToken);
        });
    });
}
