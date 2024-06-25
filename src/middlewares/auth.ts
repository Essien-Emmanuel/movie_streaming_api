import { Request, Response, NextFunction} from 'express';
import { NotFoundError } from '../libs/exceptions';

type TokenFlag = {
    AUTH: 'authentication',
    EMAIL_VERIFICATION: 'email-verification'
}

class AuthMiddleware {
    static async authentication(tokenFlag: TokenFlag) {
        return (req: Request, res: Response, next: NextFunction) => {
            const authorization = req.headers.authorization || "";
            const [, token] = authorization?.split(" ") 

            if (!token) throw new NotFoundError('No Bearer Token');
        }
    }
}

export { AuthMiddleware }