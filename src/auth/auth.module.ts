import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../usermaster/usermaster.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import {JwtModule} from '@nestjs/jwt';
import {JwtRefreshTokenStrategy} from './jwt.refreshtoken.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/usermaster/usermaster.service';

@Module({
  imports: [ UserModule, PassportModule,
  JwtModule.register({
    secret: "eyJhbGciOiJIUzUxMiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMzIyMDYwNywiaWF0IjoxNzAzMjIwNjA3fQ.PrQDSQS-GxNuhiTgQFhA6qjfIFUR0jhTtAH1-QzNWazxCdtQug3mOW7bfh9V-QtQRYWhwIJJJfkPzpg0uV0YFg",
    signOptions:{
      expiresIn: '1800s'
    }
  })

],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
  exports:[AuthService]
})
export class AuthModule {}
