import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminCreatorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!(String(req.user.id) === req.user.id && req.user.is_creator)) {
      throw new UnauthorizedException({
        message: 'Unauthorized user',
      });
    }
    return true;
  }
}
