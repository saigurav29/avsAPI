import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {Injectable, UnauthorizedException, Body} from '@nestjs/common';
import {UserService} from '../usermaster/usermaster.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy,"jwt-refreshtoken") {
  constructor(private userService:UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('accessToken'),
      ignoreExpiration: false,
      secretOrKey: 'eyJhbGciOiJIUzUxMiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMzIyMDYwNywiaWF0IjoxNzAzMjIwNjA3fQ.PrQDSQS-GxNuhiTgQFhA6qjfIFUR0jhTtAH1-QzNWazxCdtQug3mOW7bfh9V-QtQRYWhwIJJJfkPzpg0uV0YFg',
      passReqToCallback:true
    });
  }

  async validate(req,payload: any) {
    
    var user = await this.userService.findOne(payload.username);
    if(!user){
        throw new UnauthorizedException();
    }
    if(req.body.refreshToken != (await user).token){
        throw new UnauthorizedException();
    }
    if( new Date() > new Date((await user).lastloginIn)){
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, username: payload.username };
  }
}
