import { ApiProperty } from "@nestjs/swagger";
import { MinLength, isNotEmpty, isNumber, isString } from "class-validator";

export class LoginUserDto{
    @ApiProperty()
    userName:string;
    
    @ApiProperty()
    @MinLength(8)
    password:string;
}