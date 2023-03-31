import {
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { users } from 'models/usersSchema';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    try {
      const jwtKey = req.headers.authorization;

      if (!jwtKey) {
        throw new UnauthorizedException('Not Authorized');
      }

      const token: any = verify(jwtKey, process.env.SECRET_KEY);

      const user = await users.findByPk(token.user_id);

      if (!user) {
        res.send({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'You must login first',
        });
      } else {
        next();
      }
    } catch (e) {
      res.send({ statusCode: e.status, message: e.message });
    }
  }
}
