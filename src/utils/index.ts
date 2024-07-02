import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { TTokenFlag } from '../types';
import { Config } from '../config';

const { saltRounds, secret } = Config.app;

type JWTPayload = {
    user: { id: number; email: string; };
    flag: TTokenFlag;
    timestamp: number;
}

export const generateToken = (payload: JWTPayload, expiresIn: string = '1000h'): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn }, (error, encodedToken) => {
            if (error) reject(error);
            return resolve(<string>encodedToken);
        });
    });
}

export const verifyToken = (token: string): Promise<JWTPayload> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error, decodedToken: JWTPayload | any) => {
            if (error) reject(error);
            return resolve(decodedToken);
        });
    });
}

export const hashString = (str: string) => {
    return bcrypt.hash(str, saltRounds );
}

export const compareStrings = (str: string, hashedStr: string) => {
    return bcrypt.compare(str, hashedStr);
}

export const generateOTP = async (otpLen: number = 6) => {
	let otp = '';
	for (let i = 0; i < otpLen; i++) {
		const randomInt = Math.floor(Math.random() * otpLen);
		otp += randomInt;
	}
	return otp;
}
