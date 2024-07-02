import { Response, NextFunction} from 'express';
import { AuthenticationError, AuthorizationError, NotFoundError } from '../libs/exceptions';
import { verifyToken } from '../utils';
import { UserRepo } from '../database/repositories/user.repo';
import { TTokenFlag, SessionRequest, Role, TRole } from '../types';

export class AuthMiddleware {
    static authenticate(tokenFlag: TTokenFlag) {
        return async (req: SessionRequest, _res: Response, next: NextFunction) => {
            const authorization = req.headers.authorization || "";
            const [, token] = authorization?.split(" ");

            if (!token) next(new AuthenticationError('No Bearer Token'));

            try {
                const { user, flag } = await verifyToken(token);
                
                if (!flag) return next( new AuthenticationError(`No ${tokenFlag} Token Flag.`));
    
                if (!user) return next(new AuthenticationError('User not stored in token.'));
    
                const foundUser = await UserRepo.getById(user.id);
                if (!foundUser) return next(new NotFoundError('User not found'));
    
                req.session = {
                    token,
                    user,
                    role: Role.USER
                }
                
                return next();
            } catch (error: any) {
                switch (error.name) {
                    case 'JsonWebTokenError':
                        return new AuthenticationError(error.name);
                    case "TokenExpiredError":
                        return new AuthenticationError("Token has Expired");
                    default:
                        return next(error);
                }
            }
        }
    }

    static Authorize(roles: TRole[]) {
        return (req: SessionRequest, res: Response, next: NextFunction) => {
            if (!roles.includes(req.session.role)) return next(new AuthorizationError('Not authorized to access this endpoint.'));
            return next();
        }
    }
}
