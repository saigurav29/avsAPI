import { Controller, Get, Request, Post, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import {AuthService} from './auth/auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { usermaster } from './usermaster/usermaster.entity';
import { LoginUserDto } from './shared/dto/LoginUserDto';
import {UseGuards} from "@nestjs/common/decorators/core/use-guards.decorator";


@Controller('app')
@ApiTags('app')
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService:AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //@UseGuards(AuthGuard('local'))
  @ApiBody({type:LoginUserDto})
  @Post('auth/login')
  async login( @Request() req:any){
    return this.authService.login({UserName: req.body.userName,password:req.body.password});
  }

    // @Post('auth/login')
  // async login(){
  //   return await this.authService.validateUser("naveen","1234");
  // }
@Version('1')
  @UseGuards(AuthGuard('jwt'))
  @Get('/todos')
  getTodos(){
    return ['Watch Movie', 'Take Health Test', 'Play Cricket'];
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/refreshtoken')
  async refreshToken(@Request() req){
    return await this.authService.login({UserName: req.body.userName,password:req.body.password});
  }
}
