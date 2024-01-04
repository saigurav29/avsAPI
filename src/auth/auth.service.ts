import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../usermaster/usermaster.service';
import {JwtService} from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm';
import { usermaster } from 'src/usermaster/usermaster.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from 'src/shared/dto/LoginUserDto';
import * as bcrypt from "bcrypt";
var randtoken = require('rand-token');

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(private jwtService:JwtService,
        private usersService:UserService,
      ){

    }

//     async validateuserCredentials(userdto:LoginUserDto){
//         const {userName, password}=userdto
//         const resultData = await this.userRep.findOne({
//             where: {UserName:userName},
//             select:{
//                 UserName:true,
//                 UserId:true,
//                 lastloginIn:true
//                 },
//         });
        
// if(!resultData){
//     this.logger.error('Invalid Credentials!.')
//     throw new UnauthorizedException("Invalid Credentials");
// }
// const hashedpassword = resultData.password;
// //const passwordMatch = await bcrypt.compare(password,hashedpassword);
// if(resultData.password != password){
//     this.logger.error('Invalid Credentials!.')
//     throw new UnauthorizedException("Invalid Credentials");
// }
// return resultData;
//     }

    async validateUser(userName:string, pass:string):Promise<any>{
        const user = await this.usersService.findOne(userName);
        if(user && user.password === pass){
            const result = {
               id: user.UserId,
               userName:  user.UserName
            };
            return result;
        }
        return null;
    }

    async login(user:any){
       // const payload = {username: user.UserName, sub: user.UserName};
        return{
            accessToken : await this.loginwithCreadentials(user),
          //  refreshToken: await this.generateRefreshToken(user.UserId)
        }
    }

    async loginwithCreadentials(user:any){
        let refnanme="";
        const userdata =await this.usersService.findOne(user.UserName);
        if(userdata){
            refnanme= userdata.UserName;
        }
        if(!userdata){
                this.logger.error('Invalid Credentials!.')
                throw new UnauthorizedException("Invalid Credentials");
            }
        if(user.password != userdata.password){
            this.logger.error('Invalid Credentials!.')
            throw new UnauthorizedException("Invalid Credentials");
        }
        const paylod={
            userName:userdata.UserName,
            sub:userdata.UserId
        };
        return this.jwtService.sign(paylod);
    }
    async generateRefreshToken(userId):  Promise<string>{
        var refreshToken = randtoken.generate(16);
        var expirydate =new Date();
        expirydate.setDate(expirydate.getDate() + 6*30);
        await this.usersService.saveorupdateRefreshToke(refreshToken, userId, expirydate);
        return refreshToken
    }
    
}
